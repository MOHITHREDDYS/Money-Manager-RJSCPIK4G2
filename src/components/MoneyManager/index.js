import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
/* const moneyTypeAndBalance = [
  {
    typeId: 'Balance',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png',
    displayText: 'Your Balance',
    balance: 0,
    altValue: 'balance',
    backgroundProperty: 'background_properties1',
  },
  {
    typeId: 'Income',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png',
    displayText: 'Your Income',
    balance: 0,
    altValue: 'income',
    backgroundProperty: 'background_properties2',
  },
  {
    typeId: 'Expenses',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png',
    displayText: 'Your Expenses',
    balance: 0,
    altValue: 'expenses',
    backgroundProperty: 'background_properties3',
  },
] */
class MoneyManager extends Component {
  state = {
    transactionTypes: transactionTypeOptions,
    transactionsList: [],
    titleEntered: '',
    amountEntered: '',
    typeEntered: 'INCOME',
    totalBalance: 0,
    totalIncome: 0,
    totalExpenses: 0,
    error1: '',
    error2: '',
  }

  onChangingTitle = event => {
    this.setState({titleEntered: event.target.value, error1: ''})
  }

  onChangingAmount = event => {
    if (/^-?\d+$/.test(event.target.value)) {
      return this.setState({amountEntered: event.target.value, error2: ''})
    }
    return this.setState({amountEntered: ''})
  }

  onChangingType = event => {
    this.setState({typeEntered: event.target.value})
  }

  onClickingAdd = event => {
    event.preventDefault()
    const {titleEntered, amountEntered, typeEntered} = this.state

    const newTransaction = {
      id: uuidv4(),
      title: titleEntered,
      amount: amountEntered,
      type: typeEntered,
    }

    if (titleEntered === '') {
      this.setState({error1: '*Required'})
    }
    if (titleEntered === '') {
      this.setState({error2: '*Required'})
    } else if (typeEntered === 'INCOME') {
      this.setState(prevState => ({
        transactionsList: [...prevState.transactionsList, newTransaction],
        totalBalance: prevState.totalBalance + parseInt(amountEntered),
        totalIncome: prevState.totalIncome + parseInt(amountEntered),
        typeEntered: 'INCOME',
        titleEntered: '',
        amountEntered: '',
      }))
    } else if (typeEntered === 'EXPENSES') {
      this.setState(prevState => ({
        transactionsList: [...prevState.transactionsList, newTransaction],
        totalBalance: prevState.totalBalance - parseInt(amountEntered),
        totalExpenses: prevState.totalExpenses + parseInt(amountEntered),
        typeEntered: 'INCOME',
        titleEntered: '',
        amountEntered: '',
      }))
    }
  }

  deleteTransaction = (id, amount, type) => {
    if (type === 'INCOME') {
      return this.setState(prevState => ({
        transactionsList: prevState.transactionsList.filter(
          eachTransaction => eachTransaction.id !== id,
        ),
        totalBalance: prevState.totalBalance - amount,
        totalIncome: prevState.totalIncome - amount,
      }))
    }
    return this.setState(prevState => ({
      transactionsList: prevState.transactionsList.filter(
        eachTransaction => eachTransaction.id !== id,
      ),
      totalBalance: prevState.totalBalance + amount,
      totalExpenses: prevState.totalExpenses - amount,
    }))
  }

  render() {
    const {
      transactionTypes,
      transactionsList,
      totalBalance,
      totalIncome,
      totalExpenses,
      titleEntered,
      amountEntered,
      typeEntered,
      error1,
      error2,
    } = this.state

    return (
      <div className="main_container">
        <div className="container">
          <div className="profile_container">
            <h1 className="profile_greeting">Hi, Richard</h1>
            <p className="profile_description">
              Welcome back to your{' '}
              <span className="profile_span">Money Manager</span>
            </p>
          </div>
          <ul className="balances_container">
            <MoneyDetails
              totalBalance={totalBalance}
              totalIncome={totalIncome}
              totalExpenses={totalExpenses}
            />
          </ul>
          <div className="transaction_and_history_container">
            <div className="transaction_container">
              <h1 className="transaction_name">Add Transaction</h1>
              <form>
                <label htmlFor="title" className="transaction_label">
                  TITLE
                </label>
                <br />
                <input
                  className="inputs"
                  id="title"
                  placeholder="TITLE"
                  value={titleEntered}
                  onChange={this.onChangingTitle}
                />
                <br />
                <p className="error">{error1}</p>
                <label htmlFor="amount" className="transaction_label">
                  AMOUNT
                </label>
                <br />
                <input
                  className="inputs"
                  id="amount"
                  placeholder="AMOUNT"
                  value={amountEntered}
                  onChange={this.onChangingAmount}
                />
                <br />
                <p className="error">{error2}</p>
                <label htmlFor="type" className="transaction_label">
                  TYPE
                </label>
                <br />
                <select
                  id="type"
                  className="inputs"
                  onChange={this.onChangingType}
                  value={typeEntered}
                >
                  {transactionTypes.map(eachType => (
                    <option key={eachType.optionId} value={eachType.optionId}>
                      {eachType.displayText}
                    </option>
                  ))}
                </select>
                <br />
                <button
                  type="submit"
                  className="add_button"
                  onClick={this.onClickingAdd}
                >
                  Add
                </button>
              </form>
            </div>
            <div className="transaction_container history_container">
              <h1 className="transaction_name">History</h1>
              <ul className="history_list_container">
                <li className="list_container title_border table_header">
                  <p className="list_values">Title</p>
                  <p className="list_values">Amount</p>
                  <p className="list_values">Type</p>
                </li>
                {transactionsList.map(eachTransaction => (
                  <TransactionItem
                    key={eachTransaction.id}
                    transaction={eachTransaction}
                    transactionTypes={transactionTypeOptions}
                    deleteTransaction={this.deleteTransaction}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
