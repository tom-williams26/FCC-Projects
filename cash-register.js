var calculateChange = function (changeRemaining, changeInDrawer) {
	const denomination = {
		'PENNY': 1,
		'NICKEL': 5,
		'DIME': 10,
		'QUARTER': 25,
		'ONE': 100,
		'FIVE': 500,
		'TEN': 1000,
		'TWENTY': 2000,
		'ONE HUNDRED': 10000,
	};

	let change = [];
	let totalCid = 0;
	changeInDrawer.reverse().map((slot) => {
		const coinName = slot[0];
		const coinValue = denomination[coinName];
		const coinTotal = slot[1] * 100;
		totalCid += coinTotal;
		let coinAmount = coinTotal / coinValue;
		let coinsToReturn = 0;

		while (changeRemaining >= coinValue && coinAmount > 0) {
			changeRemaining -= coinValue;
			coinAmount--;
			coinsToReturn++;
		}
		if (coinsToReturn > 0) {
			change.push([coinName, (coinsToReturn * coinValue) / 100]);
		}
	});
	totalCid = totalCid / 100;
	return [change, totalCid, changeRemaining];
};

var checkCashRegister = function (price, cash, cid) {
	const registerStatus = {
		insufficient_funds: {
			status: 'INSUFFICIENT_FUNDS',
			change: [],
		},
		closed: {
			status: 'CLOSED',
			change: [],
		},
		open: {
			status: 'OPEN',
			change: [],
		},
	};

	let changeDue = cash * 100 - price * 100;
	let checkChange = changeDue;
	checkChange = checkChange / 100;

	let [changeReturned, totalCid, leftOverChange] = calculateChange(
		changeDue,
		cid
	);

	// console.log(leftOverChange / 100);
	// console.log(
	// 	'Change due:',
	// 	checkChange,
	// 	'. total change in register:',
	// 	totalCid
	// );
	console.log(changeReturned);
	if (leftOverChange > 0) {
		return registerStatus.insufficient_funds;
	}

	if (leftOverChange == 0 && totalCid == checkChange) {
		registerStatus.closed.change = [...cid].reverse();
		return registerStatus.closed;
	} else {
		registerStatus.open.change = changeReturned;
		return registerStatus.open;
	}
};

var test1 = checkCashRegister(19.5, 20, [
	['PENNY', 1.01],
	['NICKEL', 2.05],
	['DIME', 3.1],
	['QUARTER', 4.25],
	['ONE', 90],
	['FIVE', 55],
	['TEN', 20],
	['TWENTY', 60],
	['ONE HUNDRED', 100],
]);
console.log('Test 1:', test1);

var test2 = checkCashRegister(3.26, 100, [
	['PENNY', 1.01],
	['NICKEL', 2.05],
	['DIME', 3.1],
	['QUARTER', 4.25],
	['ONE', 90],
	['FIVE', 55],
	['TEN', 20],
	['TWENTY', 60],
	['ONE HUNDRED', 100],
]);
console.log('Test 2:', test2);

var test3 = checkCashRegister(19.5, 20, [
	['PENNY', 0.01],
	['NICKEL', 0],
	['DIME', 0],
	['QUARTER', 0],
	['ONE', 0],
	['FIVE', 0],
	['TEN', 0],
	['TWENTY', 0],
	['ONE HUNDRED', 0],
]);
console.log('Test 3:', test3);

var test4 = checkCashRegister(19.5, 20, [
	['PENNY', 0.01],
	['NICKEL', 0],
	['DIME', 0],
	['QUARTER', 0],
	['ONE', 1],
	['FIVE', 0],
	['TEN', 0],
	['TWENTY', 0],
	['ONE HUNDRED', 0],
]);
console.log('Test 4:', test4);

var test5 = checkCashRegister(19.5, 20, [
	['PENNY', 0.5],
	['NICKEL', 0],
	['DIME', 0],
	['QUARTER', 0],
	['ONE', 0],
	['FIVE', 0],
	['TEN', 0],
	['TWENTY', 0],
	['ONE HUNDRED', 0],
]);
console.log('Test 5:', test5);
