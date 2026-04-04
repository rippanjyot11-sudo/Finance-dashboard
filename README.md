# Finance Dashboard (React + Tailwind)

A responsive Finance Dashboard built using React and Tailwind CSS.
This project allows users to track income, expenses, and analyze financial data through interactive charts and insights.


##  Features

### Dashboard
* Displays total income for 12 months
* Displays total expenses for 12 months
* Shows remaining balance (income minus expenses)
* Line chart representing monthly remaining balance trend
* Pie chart showing category-wise expenses (Food, Travel, Shopping, Health, etc.)


### Transactions
* View complete transaction history
* Filter transactions:

  * Month-wise
  * Date-wise
* Sort transactions:

  * By date
  * By amount
* Role-based access:

  * **Viewer**: Can only view transactions
  * **Admin**:

    * Add transactions
    * Edit transactions
    * Delete transactions


### Insights
* Compare current month with another month
* Displays:

  * Highest spending category
  * Lowest spending category
  * Monthly expense comparison
* Bar chart for monthly expense trends
* Provides insights such as increase/decrease in spending


### Navigation

**Sidebar includes:**

* Dashboard
* Transactions
* Insights

**Header includes:**

* Viewer / Admin toggle


## Tech Stack
* React
* Tailwind CSS
* Recharts


## 📁 Project Structure
src/
│
├── components/
│   ├── dashboard/
│   │   ├── Insights.jsx
│   │   ├── LineChart.jsx
│   │   ├── PieChart.jsx
│   │   ├── SummaryCard.jsx
│   │
│   ├── layout/
│   │   ├── Header.jsx
│   │   ├── Layout.jsx
│   │   ├── Sidebar.jsx
│   │
│   ├── transactions/
│   │   └── TransactionTable.jsx
│
├── context/
│   └── AppContext.jsx
│
├── data/
│   └── mockData.js
│
├── pages/
│   └── Dashboard.jsx
│
├── App.jsx
├── App.css
├── index.css
├── main.jsx
│
├── package.json
├── package-lock.json
└── vite.config.js



## Data
* Uses mock data for the year 2025 (12 months)
* Includes income, expenses, and categories


## Key Highlights

* Responsive UI built with Tailwind CSS
* Component-based architecture using React
* Role-based functionality (Admin and Viewer)
* Data visualization using charts
* Real-world financial tracking logic


## How to Run
npm install
npm run dev


## Future Improvements
* Backend integration (Node.js + database)
* User authentication
* Persistent data storage
* Export reports


## Author
Rippan jot kaur

