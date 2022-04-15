import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { Select } from 'antd';

const { Option } = Select;

const MortgageCalculatorPage = () => {
	const [data, setData] = useState(
		JSON.parse(localStorage.getItem('data')) || []
	);
	const [inputs, setInputs] = useState({
		initialLoan: '',
		downPayment: '',
		bankName: '',
	});
	const [res, setRes] = useState(null);

	const handleInput = (e) => {
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};

	const handleSelect = (value) => {
		setInputs({ ...inputs, bankName: value });
	};

	const handleSubmit = () => {
		const gg = data.filter((item) => item.name === inputs.bankName);
		if (+inputs.downPayment < +gg[0].min) {
			alert(`Минимальный авансовый платеж ${gg[0].min}`);
			return;
		}
		if (+gg[0].max < +inputs.initialLoan) {
			alert(`банк не способен предоставить запрошенный кредит`);
			return;
		}
		const p = Number(inputs.initialLoan);
		const r = Number(gg[0].percent);
		const n = Number(gg[0].kredit);

		const monthRate = r / 100 / 12;
		const bottom = Math.pow(1 + monthRate, n) - 1;
		const sum = monthRate / bottom;
		const month = +(p * (monthRate + sum)).toFixed(2);
		setRes(month);
	};

	return (
		<div>
			<form style={{ width: 400, margin: '0 auto' }}>
				<Input
					type='text'
					name='initialLoan'
					onChange={handleInput}
					placeholder='Первоначальный заем'
					style={{ marginTop: '20px' }}
				/>
				<Input
					type='text'
					name='downPayment'
					onChange={handleInput}
					placeholder='Первоначальный взнос'
					style={{ marginTop: '20px' }}
				/>
				<Select
					style={{ width: 200, marginTop: '20px' }}
					name='bankName'
					onChange={handleSelect}
				>
					{data.map((item) => (
						<Option key={item.key} value={item.name}>
							{item.name}
						</Option>
					))}
				</Select>
				<Button
					type='submit'
					onClick={handleSubmit}
					style={{ marginTop: '20px', display: 'block' }}
				>
					Рассчитать
				</Button>
			</form>
			<h1 style={{ textAlign: 'center' }}>{res}</h1>
		</div>
	);
};

export default MortgageCalculatorPage;
