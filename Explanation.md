# Web Scraper and Data Summaries

## Project Description

This project is designed to automate the extraction of data from various online sources and summarize it efficiently. The system is built to handle large-scale data scraping and processing tasks, ensuring the data is stored, analyzed, and summarized in a structured format. This project leverages modern technologies, making it highly reliable and scalable for diverse use cases.

The main objectives of the project are:
1. Automating the process of data collection from websites(user Provided Urls).
2. Storing and organizing data in a database for further analysis.
3. Generating summaries from the scraped data to provide insights.

## Features
- **Data Scraping**: Extracts data from targeted web pages using custom logic and tools.
- **Data Summarization**: Analyzes and condenses extracted data into meaningful summaries.
- **Database Integration**: Stores scraped data and summaries in a PostgreSQL database.
- **Error Handling**: Handles edge cases such as invalid urls and modelFailure.
- **REST API**: Allows interaction with the system for adding, updating, and retrieving summaries.

## Technology Stack
- **Backend**: Node.js with Sequelize ORM.
- **Database**: PostgreSQL  
  - The Schema was well-defined and we had strict requirements.
  - The size of summaries could be very large, making handling complicated in NoSQL.
  - Strong ACID compliance; supports complex multi-row transactions.
  - **Tradeoffs**:
    - Scaling: Vertical scaling is common; horizontal scaling requires sharding.
    - Cost of Scaling: Vertical scaling can become expensive for high loads.

- **Tools**:  
  - **Puppeteer**: Best tool for web scraping; works headless by default, meaning it doesn't need any UI.  
  - **GroQCloud**: Used for summarizing content gathered from websites. Initially considered OpenAI due to its advancements, but switched to GroQ due to OpenAI's discontinued free tier. GroQ is reliable, provides an SDK, and is easy to integrate.  
  - **Lodash**: Used for error-handling functionalities.  
  - **Custom Upsert Function**: Implements database operations to handle `exists(instance) ? update : create(instance)` logic seamlessly.

- **Languages**: JavaScript, SQL.




## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/RaKAsHASH/RankMeScrapperTask.git
   cd RankMeScrapperTask

2. Install dependencies:
   ```bash
   npm i
3. Configure environment variables: Create a .env file in the root directory and add necessary configurations for the database and other services:
   ```bash
   DB_USER=<your_db_user>
   DB_PASSWORD=<your_db_passeord>
   DB_NAME=<your_db_name>
   DB_TEST_NAME=<your_testing_db_name> (These DB_TEST_NAME is for testing db name,similarly you can add for prod)
   DB_HOST=<your_db_host>     (eg:localhost)
   DB_PORT=<db_port>
   NODE_ENV=development
   GROQ_API_KEY="YOUR_API_KEY"
   BACKEND_URL='http://localhost:5050'
4. Start the application
   Once everything is set up, start the application:
   ```bash
   npm start


# Here are sample of Project Testing
![Screenshot](./ProofOfConcept/Screenshot%202024-12-04%20at%202.35.33%20PM.png "Application Screenshot")
![Screenshot](./ProofOfConcept/Screenshot%202024-12-04%20at%202.35.44%20PM.png "Application Screenshot")
![Screenshot](./ProofOfConcept/Screenshot%202024-12-04%20at%202.36.22%20PM.png "Application Screenshot")