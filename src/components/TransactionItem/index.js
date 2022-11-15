// Write your code here
import './index.css'

const TransactionItem = props => {
  const {transaction, deleteTransaction, transactionTypes} = props
  const {id, title, amount, type} = transaction

  const amountType = transactionTypes.filter(
    eachtype => eachtype.optionId === type,
  )
  const requiredType = amountType[0].displayText

  const onClickingDeleteIcon = () => {
    deleteTransaction(id, parseInt(amount), type)
  }

  return (
    <li className="list_container values_border">
      <p className="list_values">{title}</p>
      <p className="list_values">Rs {amount}</p>
      <div className="list_values delete_image_container">
        <p>{requiredType}</p>
        <button
          type="button"
          className="delete_button"
          onClick={onClickingDeleteIcon}
          testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
            className="delete_image"
          />
        </button>
      </div>
    </li>
  )
}

export default TransactionItem
