import React, { useState } from "react";
import { Form, Input, Select, Modal, message } from "antd";
import axios from "axios";
import Spinner from "../components/Spinner";
function AddEditTrasaction({
  setShowAddEditTransactionModal,
  showAddEditTransactionModal,
  getTransactions,
  selectedItemForEdit,
  setSelectedItemForEdit,
}) {
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("Expenses-User"));
      setLoading(true);
      if (selectedItemForEdit) {
        await axios.post("/api/transactions/edit-transaction", {
          payload: {
            ...values,
            userId: user._id,
          },
          transactionId: selectedItemForEdit._id,
        });
        getTransactions();
        message.success("Transaction Updated Successfully");
      } else {
        await axios.post("/api/transactions/add-transaction", {
          ...values,
          userId: user._id,
        });
        getTransactions();
        message.success("Transaction added successfully");
      }
      setShowAddEditTransactionModal(false);
      setSelectedItemForEdit(null);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };
  return (
    <Modal
      title={selectedItemForEdit ? "Edit Transaction" : "Add Transaction"}
      visible={showAddEditTransactionModal}
      onCancel={() => setShowAddEditTransactionModal(false)}
      footer={false}
    >
      {loading && <Spinner />}
      <Form
        layout="vertical"
        className="transaction-form"
        onFinish={onFinish}
        initialValues={selectedItemForEdit}
      >
        <Form.Item label="Amount" name="amount">
          <Input type="text" />
        </Form.Item>
        <Form.Item label="Type" name="type">
          <Select>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Category" name="category">
          <Select>
            <Select.Option value="salary">Salary</Select.Option>
            <Select.Option value="food">Food</Select.Option>
            <Select.Option value="shopping">Shopping</Select.Option>
            <Select.Option value="entertainment">Entertainment</Select.Option>
            <Select.Option value="maintenance">Maintenance</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Date" name="date">
          <Input type="date" />
        </Form.Item>

        <Form.Item label="Reference" name="reference">
          <Input type="text" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input type="text" />
        </Form.Item>
        <div className="d-flex justify-content-end">
          <button className="primary" type="submit">
            Save
          </button>
        </div>
      </Form>
    </Modal>
  );
}

export default AddEditTrasaction;
