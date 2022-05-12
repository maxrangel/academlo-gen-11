import classes from './transfer-item.module.css';

const TransferItem = ({ transfer }) => {
	const formattedDate = new Date(transfer.date).toLocaleDateString('en-US', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});

	const formattedAmount = transfer.amount.toFixed(2);

	return (
		<div className={classes.transfer}>
			{/* <p className={classes['transfer__user']}>To: {transfer.user}</p> */}
			<p className={classes['transfer__date']}>Date: {formattedDate}</p>
			<p className={classes['transfer__amount']}>Amount: ${formattedAmount}</p>
		</div>
	);
};

export default TransferItem;
