import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';

const Edit = ({
	isModalVisible2,
	setIsModalVisible2,
	editID,
	data,
	setData,
}) => {
	const [inputs, setInputs] = useState({});

	useEffect(() => {
		setInputs(editID);
	}, [editID]);

	const handleOk2 = () => {
		setIsModalVisible2(false);
		const index = data.findIndex((item) => item.key === editID.key);
		const res = [...data];
		res[index] = inputs;
		setData(res);
	};

	const handleCancel2 = () => {
		setIsModalVisible2(false);
	};

	const handleInput = (e) => {
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};

	return (
		<>
			<Modal
				title='Basic Modal'
				visible={isModalVisible2}
				onOk={handleOk2}
				onCancel={handleCancel2}
			>
				<input
					type='text'
					name='name'
					style={{ display: 'block', marginTop: 10 }}
					value={inputs.name}
					onChange={handleInput}
				/>
				<input
					type='text'
					name='percent'
					style={{ display: 'block', marginTop: 10 }}
					value={inputs.percent}
					onChange={handleInput}
				/>
				<input
					type='text'
					name='max'
					style={{ display: 'block', marginTop: 10 }}
					value={inputs.max}
					onChange={handleInput}
				/>
				<input
					type='text'
					name='min'
					style={{ display: 'block', marginTop: 10 }}
					value={inputs.min}
					onChange={handleInput}
				/>
				<input
					type='text'
					name='kredit'
					style={{ display: 'block', marginTop: 10 }}
					value={inputs.kredit}
					onChange={handleInput}
				/>
			</Modal>
		</>
	);
};

export default Edit;
