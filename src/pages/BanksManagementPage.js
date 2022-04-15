import React, { useEffect, useState } from 'react';
import { Table, Space, Button, Modal } from 'antd';
import { uid } from 'uid';
import Edit from '../components/Edit';

const BanksManagementPage = () => {
	const columns = [
		{
			title: 'Имя',
			dataIndex: 'name',
			key: 'name',
			render: (text) => <h3>{text}</h3>,
		},
		{
			title: '%',
			dataIndex: 'percent',
			key: 'percent',
		},
		{
			title: 'Максимальный кредит',
			dataIndex: 'max',
			key: 'max',
		},
		{
			title: 'Минимальный авансовый платеж',
			key: 'min',
			dataIndex: 'min',
		},
		{
			title: 'Срок кредита',
			dataIndex: 'kredit',
			key: 'kredit',
		},
		{
			title: '_',
			key: 'action',
			render: (text, record) => (
				<Space size='middle'>
					<Button type='primary' onClick={() => showModal2(record)}>
						Редактировать {record.name}
					</Button>
					<Button type='button' onClick={() => deleteItem(record.key)}>
						Удалить
					</Button>
				</Space>
			),
		},
	];

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isModalVisible2, setIsModalVisible2] = useState(false);
	const [editID, setEditID] = useState({});
	const [data, setData] = useState(
		JSON.parse(localStorage.getItem('data')) || []
	);
	const [inputs, setInputs] = useState({
		key: uid(),
		name: '',
		percent: '',
		max: '',
		min: '',
		kredit: '',
	});

	useEffect(() => {
		localStorage.setItem('data', JSON.stringify(data));
	}, [data]);

	const handleInput = (e) => {
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};

	const showModal = () => {
		setIsModalVisible(true);
	};

	const showModal2 = (record) => {
		setIsModalVisible2(true);
		setEditID(record);
	};

	const handleOk = () => {
		if (+inputs.percent > 100) {
			alert('Процентная ставка не может быть боьше 100');
			return;
		}
		setIsModalVisible(false);
		setData([...data, inputs]);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const deleteItem = (key) => {
		setData(data.filter((item) => item.key !== key));
	};

	return (
		<div>
			<div
				style={{ display: 'flex', justifyContent: 'space-between', width: 600 }}
			>
				<h1>Список банков</h1>
				<Button type='primary' onClick={showModal}>
					Создать
				</Button>
			</div>
			<Table columns={columns} dataSource={data} />
			<>
				<Modal
					title='Basic Modal'
					visible={isModalVisible}
					onOk={handleOk}
					onCancel={handleCancel}
				>
					<input
						type='text'
						name='name'
						style={{ display: 'block', marginTop: 10 }}
						placeholder='Имя'
						onChange={handleInput}
					/>
					<input
						type='text'
						name='percent'
						style={{ display: 'block', marginTop: 10 }}
						placeholder='Процентная ставка'
						onChange={handleInput}
					/>
					<input
						type='text'
						name='max'
						style={{ display: 'block', marginTop: 10 }}
						placeholder='Максимальный кредит'
						onChange={handleInput}
					/>
					<input
						type='text'
						name='min'
						style={{ display: 'block', marginTop: 10 }}
						placeholder='Минимальный авансовый платеж'
						onChange={handleInput}
					/>
					<input
						type='text'
						name='kredit'
						style={{ display: 'block', marginTop: 10 }}
						placeholder='Срок кредита'
						onChange={handleInput}
					/>
				</Modal>
			</>
			<Edit
				isModalVisible2={isModalVisible2}
				setIsModalVisible2={setIsModalVisible2}
				editID={editID}
				data={data}
				setData={setData}
			/>
		</div>
	);
};

export default BanksManagementPage;
