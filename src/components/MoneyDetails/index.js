// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {totalBalance, totalIncome, totalExpenses} = props

  return (
    <>
      <div className="background_properties1 amounts_container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
          className="totalAmount_image"
        />
        <div>
          <p className="totalAmount_name">Your Balance</p>
          <p className="total_balance" testid="balanceAmount">
            Rs {totalBalance}
          </p>
        </div>
      </div>
      <div className="background_properties2 amounts_container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
          className="totalAmount_image"
        />
        <div>
          <p className="totalAmount_name">Your Income</p>
          <p className="total_balance" testid="incomeAmount">
            Rs {totalIncome}
          </p>
        </div>
      </div>
      <div className="background_properties3 amounts_container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
          className="totalAmount_image"
        />
        <div>
          <p className="totalAmount_name">Your Expenses</p>
          <p className="total_balance" testid="expensesAmount">
            Rs {totalExpenses}
          </p>
        </div>
      </div>
    </>
  )
}

export default MoneyDetails
