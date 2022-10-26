# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

1. UI task to add a dropdown showing all the agents and a input box along it side where custom id for each can be entered/edited and a confirm button which will make an API call. `(ex: agent/create/custom-id)`. Also a small notification showing that the status message if successful/failed.
Total Hours : `12 hours (4 hours for the UI. 3 hours for API calls. Testing 2 hour. Buffer 3 hours)`
Acceptance criteria: 
    a. drop down showing all the use agents.
    b. able to edit/insert the custom id for each
    c. making the API call for fetch(incase the customId for it is already present). This should show the custom_id in the inbox to be which can be edited if present. Or empty if none. API call `(ex: agent/fetch/agent-id)`
    c. making the API calls for insert. `(ex: agent/create/custom-id)`
    d. show the notification of the api response message on the UI.
    note: edit is additional functionality

2. Create a backend API `(ex: agent/create/custom-id)` to make an API call and make an entry in the new agents_custom_id_for_facilities. Call the function service function `insertCustomId`.
Total Hours : `4 hours`
Acceptance criteria: 
    a. Db entry happens when success
    b. Error is handled and  appropiate message sent to the frontend.
    c. Also error message sent to the slack channel etc.
    d. Behind proper middlewares
    e. Is secured and cant be accessed publically

3. Task one create a new table which will have three fields facility_id(string), agent_id(string), custom_id(string). Also create a index on facility_id (this can be used in future to get all the agents for a facility, etc) and another composite index on facility_id and agent_id(this will be used to get the custom_id which will be unique for each facility_id and agent_id level). We can call this `agents_custom_id_for_facilities`. 
Total Hours : `4 hours (1 hour for the table . 30 mins for index. Testing 1 mins. Adding to .ddl 30 mins. Buffer 1 hours)`
Acceptance criteria: 
    a. create a table in the db
    b. add the table creation query in the .ddl file
    c. also make a todo entry for when we push the changes to prod to create the table
    d. create index table for facility_id
    e. create composite index on facility_id and agent_id

4. Create a repo function `updateCustomId`. Which will call an update function with `upsert = true` if entry already present it will update it or else it will insert it.
Total Hours : `2 hours`
Acceptance criteria: 
    a. data is inserted when not available. Appropiate message sent mentioning it was inserted
    b. data is updated when it was available. Appropiate message sent mentioning it was updated
    c. both arguments and returned type should be strict typed

5. Create a service function `insertCustomId`, which will take the facilityId, agentId and customId as param and make a repo call to `updateCustomId`
Total Hours : `2 hours`
Acceptance criteria: 
    a. Return message sent mentioning it was inserted/updated
    b. both arguments and returned type should be strict typed

6. Create a repo function `getCustomIds` which takes one param, an array containing objects with the agentsIds and facilityIds as keys. We will use or condition for each value of the array. 
Total Hours : `2 hours`
Acceptance criteria: 
    a. data is available. Appropiate message sent returning all the fields i.e. facility_id, custom_id and agent_id.
    b. data is not available. Appropiate message sent mentioning no such entry available. we can use custom_id as null
    c. both arguments and returned type should be strict typed.

7. Create a service function `updateAgentIdsToCustomIds` which will take the input the entire data for use to create the pdf and internally call the `getCustomIds` and then update the data to now have customIds instead of the internal ids.
Total Hours : `2 hours`
Acceptance criteria: 
    a. If custom_id available we will update the report.
    b. If custom_id is not available we will use the agent_id itself
    c. both arguments and returned type should be strict typed

8. Update the `generateReport` function such that at the end of the function call before we convert them to pdf. We call the `updateAgentIdsToCustomIds` function and then create the pdf.
Total Hours : `2 hours`
Acceptance criteria: 
    a. If custom_id available pdf should now have the customId
    b. If custom_id is not available we will use the agent_id itself in the pdf
    c. both arguments and returned type should be strict typed.

9. Create a backend API `(ex: agent/fetch/agent-id)` this will fetch the custom id if already available. And call the function `fetchCustomIds` and return the response
Total Hours : `4 hours`
Acceptance criteria: 
    a. If custom_id available return it
    b. If custom_id is not available we will return custom_id as null. In this case the UI will show empty inbox.
    c. both arguments and returned type should be strict typed.

10. Create a service call `fetchCustomIds` which takes facility-id and agent-id and internally call repo function `getCustomIds`.
Total Hours : `2 hours`
Acceptance criteria: 
    a. If custom_id available we will update the report.
    b. If custom_id is not available we will use the agent_id itself
    c. both arguments and returned type should be strict typed