# Question-Bank-Project-Reelo-Backend
This is a project that generates question on the basis of given prompts

Steps to run this project on a local machine:

1: Clone the project in your local machine

2: Run the "npm run i" command in the project directory to install the dependencies.

3: Start the server with "npm start" or "nodemon index.js".

4: Open the PostMan app and make a get request with the following API end point: "http://localhost:3000/api/getQuestionPaper?totalMark={totalMark}&easy={PercentDIfForEasy}&medium={PercentDIfForMedium}&hard=
{PercentDIfForHard}"
Repalce {} with actual parameters

5: Response will be the questions which best fit the given parameters

6: Qeustions will be random everytime you send the reqeust

Question banks are stored in seprate JSON file you can change it by sepecifying it in the code
