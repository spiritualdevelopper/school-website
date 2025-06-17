import React, { useState, useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import {
  collection, query, orderBy, addDoc, doc, updateDoc, deleteDoc, onSnapshot
} from 'firebase/firestore';
import { db } from '../firebase';

const MidDayMeals = () => {
  const [entries, setEntries] = useState([]);
  const [expandedMonth, setExpandedMonth] = useState('');
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({
    date: '', mealsTaken: '', riceConsumed: '', riceBalance: '', eggs: '', cost: ''
  });
  const [editId, setEditId] = useState(null);
  const sectionRefs = useRef({});
  const selectedMonthRef = useRef(null);

  useEffect(() => {
    const q = query(collection(db, 'meals'), orderBy('date', 'desc'));
    return onSnapshot(q, snap => {
      setEntries(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.date) return alert('Please enter a date');

    const data = {
      ...form,
      mealsTaken: Number(form.mealsTaken),
      riceConsumed: Number(form.riceConsumed),
      riceBalance: Number(form.riceBalance),
      eggs: Number(form.eggs),
      cost: Number(form.cost)
    };

    if (editId) {
      await updateDoc(doc(db, 'meals', editId), data);
      setEditId(null);
    } else {
      await addDoc(collection(db, 'meals'), data);
    }

    setForm({ date: '', mealsTaken: '', riceConsumed: '', riceBalance: '', eggs: '', cost: '' });
  };

  const handleEdit = (entry) => {
    setEditId(entry.id);
    setForm({
      date: entry.date,
      mealsTaken: entry.mealsTaken,
      riceConsumed: entry.riceConsumed,
      riceBalance: entry.riceBalance,
      eggs: entry.eggs,
      cost: entry.cost,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this entry?')) {
      await deleteDoc(doc(db, 'meals', id));
    }
  };

  const grouped = entries.reduce((acc, e) => {
    const month = e.date.slice(0, 7);
    if (search && !e.date.includes(search)) return acc;
    acc[month] = acc[month] || [];
    acc[month].push(e);
    return acc;
  }, {});

  const toggleMonth = (m) => setExpandedMonth(prev => (prev === m ? '' : m));

  const handlePrint = useReactToPrint({
    content: () => sectionRefs.current[selectedMonthRef.current],
    documentTitle: selectedMonthRef.current,
  });

  const printMonth = async (month) => {
    selectedMonthRef.current = month;
    setExpandedMonth(month);

    // Wait to ensure ref is mounted
    await new Promise(resolve => setTimeout(resolve, 300));

    if (sectionRefs.current[month]) {
      handlePrint();
    } else {
      alert('Could not find content to print.');
    }
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-md max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Mid Day Meals Management 🍛</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        {['date', 'mealsTaken', 'riceConsumed', 'riceBalance', 'eggs', 'cost'].map((field) => (
          <input
            key={field}
            type={field === 'date' ? 'date' : 'number'}
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={field}
            className="border p-2 rounded"
            required
          />
        ))}
        <button type="submit" className="bg-blue-600 text-white col-span-2 sm:col-span-1 p-2 rounded">
          {editId ? 'Update' : 'Add'}
        </button>
      </form>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by date (YYYY-MM-DD)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border w-full rounded"
        />
      </div>

      {/* Reports */}
      {Object.keys(grouped).map(month => {
        const entriesForMonth = grouped[month];
        const totalCost = entriesForMonth.reduce((s, x) => s + (x.cost || 0), 0);
        const totalRice = entriesForMonth.reduce((s, x) => s + Number(x.riceConsumed || 0), 0);
        const totalEggs = entriesForMonth.reduce((s, x) => s + Number(x.eggs || 0), 0);
        const label = new Date(month + '-01').toLocaleString('default', { month: 'long', year: 'numeric' });

        return (
          <div key={month} className="mb-6 border rounded-lg">
            <button
              className="w-full text-left p-4 bg-blue-100 flex justify-between items-center"
              onClick={() => toggleMonth(month)}
            >
              <span>{label}</span>
              <span>{expandedMonth === month ? '−' : '+'}</span>
            </button>

            {expandedMonth === month && (
              <div className="p-4 bg-gray-50" ref={el => { if (el) sectionRefs.current[month] = el }}>
                <div className="flex flex-col sm:flex-row justify-between text-sm font-semibold mb-2">
                  <p>Total Cost: ₹{totalCost}</p>
                  <p>Total Rice: {totalRice} kg</p>
                  <p>Total Eggs: {totalEggs}</p>
                </div>

                <div className="overflow-auto mt-3">
                  <table className="w-full text-sm border">
                    <thead className="bg-gray-200 text-center">
                      <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Meals</th>
                        <th>Rice</th>
                        <th>Balance</th>
                        <th>Eggs</th>
                        <th>Cost</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {entriesForMonth.map((e, i) => (
                        <tr key={e.id} className="text-center even:bg-white odd:bg-gray-100">
                          <td>{i + 1}</td>
                          <td>{e.date}</td>
                          <td>{e.mealsTaken}</td>
                          <td>{e.riceConsumed}</td>
                          <td>{e.riceBalance}</td>
                          <td>{e.eggs}</td>
                          <td>₹{e.cost}</td>
                          <td className="flex justify-center gap-2 py-2">
                            <button onClick={() => handleEdit(e)} className="text-blue-600 hover:underline">Edit</button>
                            <button onClick={() => handleDelete(e.id)} className="text-red-600 hover:underline">Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => printMonth(month)}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Print / Export PDF
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MidDayMeals;
