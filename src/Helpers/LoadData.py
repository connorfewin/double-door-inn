import requests
import json
import os
from datetime import datetime

def read_json_file(file_path):
    """Reads a JSON file and returns the data."""
    with open(file_path, 'r') as file:
        return json.load(file)

def format_date(date_string):
    """Converts a date string to MM/DD/YYYY format."""
    try:
        # Try to parse the date string
        date_object = datetime.strptime(date_string, "%B %d, %Y")
    except ValueError:
        # If the day is missing, assume the first of the month
        date_object = datetime.strptime(date_string, "%B %Y")
        date_object = date_object.replace(day=1)  # Fill in the day as the first of the month
    
    # Format the date as MM/DD/YYYY
    return date_object.strftime("%m/%d/%Y")

def grab_all_shows(graphql_endpoint, api_key=None):
    all_shows = []
    next_token = None
    try:
        while True:
            # Define the GraphQL query for the Show type
            query = '''
                query ListShows($limit: Int, $nextToken: String) {
                    listShows(limit: $limit, nextToken: $nextToken) {
                        items {
                            id
                            date
                            day
                            headliner
                            opener
                            notes
                        }
                        nextToken
                    }
                }
            '''
            # Set the request headers
            headers = {'Content-Type': 'application/json'}
            if api_key:
                headers['x-api-key'] = api_key
            
            # Set the request payload
            payload = {
                'query': query,
                'variables': {
                    'limit': 200,
                    'nextToken': next_token
                }
            }
            # Make the HTTP POST request
            response = requests.post(graphql_endpoint, headers=headers, json=payload)
            if response.status_code == 200:
                data = response.json()
                items = data['data']['listShows']['items']
                all_shows.extend(items)
                next_token = data['data']['listShows']['nextToken']
                if not next_token:
                    break
            else:
                print("Error:", response.text)
                break
    except Exception as error:
        print("An error occurred:", error)

    return all_shows


def upload_data_to_amplify(graphql_endpoint, data, api_key=None):
    mutation = """
    mutation CreateShow($input: CreateShowInput!) {
      createShow(input: $input) {
        id
        date
        day
        headliner
        opener
        notes
      }
    }
    """
    
    headers = {
        "Content-Type": "application/json"
    }
    
    # Add API Key if provided for authorization
    if api_key:
        headers["x-api-key"] = api_key

    # Grab all existing shows to check for duplicates
    existing_shows = grab_all_shows(graphql_endpoint, api_key)
    existing_show_ids = {(show["date"], show["headliner"]) for show in existing_shows}  # Create a set of existing shows for quick lookup

    for entry in data:
        # Check if the date is None or missing
        if entry.get("DATE") is None or entry["DATE"].strip() == "":
            print(f"Missing date for headliner: {entry['HEADLINER']}")
            continue  # Skip this entry if the date is missing
        
        # Prepare the variables for the mutation
        formatted_date = format_date(entry["DATE"])  # Format the date
        show_tuple = (formatted_date, entry["HEADLINER"])
        
        # Check if the show already exists
        if show_tuple in existing_show_ids:
            continue
        
        variables = {
            "input": {
                "date": formatted_date,
                "day": entry.get("DAY"),  # Keep the original day if provided
                "headliner": entry["HEADLINER"],
                "opener": entry["OPENER"],
                "notes": entry["NOTES"]
            }
        }
        
        # Make the request to the GraphQL endpoint
        response = requests.post(graphql_endpoint, headers=headers, json={"query": mutation, "variables": variables})
        
        # Check for errors in the response
        if response.status_code != 200:
            print(f"Failed to upload entry: {entry}")
            print(f"Response: {response.text}")
        else:
            print(f"Successfully uploaded entry: {entry}")


# Example usage:
def main():
    dev_graphql_endpoint = "https://lfe4ysttlre7bloeixh45yzb2m.appsync-api.us-east-1.amazonaws.com/graphql"
    graphql_endpoint = "https://6lb5xx4gmffbpprfyqv7jtp5ra.appsync-api.us-east-1.amazonaws.com/graphql"
    dev_api_key = "da2-vanfaqg3p5hhhia3rpuhojjxnu"
    api_key = "da2-n3mugkjx6jhelbrpotgca6bzv4"  # Replace with your actual API key if needed
    json_file_path = os.path.join('src', 'Helpers', 'SampleData.json')  # Path to the JSON file

    # Read data from the JSON file
    data = read_json_file(json_file_path)

    # Upload data to the GraphQL API
    upload_data_to_amplify(dev_graphql_endpoint, data, dev_api_key)

if __name__ == "__main__":
    main()
