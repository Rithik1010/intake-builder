"use client";

import { InformationField, useRequestTypeStore } from "@/store/store";
import { useState, useEffect } from "react";

export default function Dashboard() {
    const {
        requestTypes,
        fetchRequestTypes,
        addRequestType,
        updateRequestType,
        deleteRequestType,
    } = useRequestTypeStore();
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [newRequestType, setNewRequestType] = useState("");
    const [purpose, setPurpose] = useState("");
    const [owner, setOwner] = useState("");
    const [fields, setFields] = useState<InformationField[]>([
        { name: "", field_type: "text", required: true, example: "" },
    ]);

    // Fetch request types when the component mounts
    useEffect(() => {
        fetchRequestTypes();
    }, [fetchRequestTypes]);

    const handleAddField = () => {
        setFields([
            ...fields,
            { name: "", field_type: "text", required: true, example: "" },
        ]);
    };

    const handleFieldChange = (
        index: number,
        field: Partial<InformationField>
    ) => {
        const newFields = [...fields];
        newFields[index] = { ...newFields[index], ...field };
        setFields(newFields);
    };

    const handleAddOrUpdateRequestType = async () => {
        const requestType = {
            request_type: newRequestType,
            purpose,
            information_to_collect: fields,
            request_type_owner: owner,
            time_of_creation:
                selectedIndex === null
                    ? new Date().toISOString()
                    : requestTypes[selectedIndex].time_of_creation,
            time_of_update:
                selectedIndex !== null ? new Date().toISOString() : undefined,
        };

        if (selectedIndex === null) {
            // Add new request type
            await addRequestType(requestType);
        } else {
            // Update existing request type
            await updateRequestType(selectedIndex, requestType);
        }

        // Re-fetch request types to ensure the latest data is displayed
        await fetchRequestTypes();

        resetForm();
    };

    const handleEdit = (index: number) => {
        const requestType = requestTypes[index];
        setSelectedIndex(index);
        setNewRequestType(requestType.request_type);
        setPurpose(requestType.purpose);
        setOwner(requestType.request_type_owner);
        setFields(requestType.information_to_collect);
    };

    const resetForm = () => {
        setSelectedIndex(null);
        setNewRequestType("");
        setPurpose("");
        setOwner("");
        setFields([
            { name: "", field_type: "text", required: true, example: "" },
        ]);
    };

    return (
        <div className="container mx-auto mt-10 p-6 bg-gray-100 rounded-md">
            <h1 className="text-3xl font-bold mb-6 text-center">
                Request Type Dashboard
            </h1>

            <div className="bg-white p-6 rounded-md shadow-md">
                <h2 className="text-xl font-semibold mb-4">
                    {selectedIndex === null
                        ? "Create New Request Type"
                        : "Edit Request Type"}
                </h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Request Type
                    </label>
                    <input
                        type="text"
                        value={newRequestType}
                        onChange={(e) => setNewRequestType(e.target.value)}
                        className="mt-1 p-2 block w-full border rounded-md"
                        placeholder="E.g., NDA Request - Sales"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Purpose
                    </label>
                    <textarea
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        className="mt-1 p-2 block w-full border rounded-md"
                        placeholder="Define when this form should be filled..."
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Request Type Owner (Email)
                    </label>
                    <input
                        type="email"
                        value={owner}
                        onChange={(e) => setOwner(e.target.value)}
                        className="mt-1 p-2 block w-full border rounded-md"
                        placeholder="owner@example.com"
                    />
                </div>

                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">
                        Information to Collect
                    </h3>
                    {fields.map((field, index) => (
                        <div
                            key={index}
                            className="mb-4 p-4 border rounded-md bg-gray-50"
                        >
                            <input
                                type="text"
                                value={field.name}
                                onChange={(e) =>
                                    handleFieldChange(index, {
                                        name: e.target.value,
                                    })
                                }
                                className="mt-1 p-2 block w-full border rounded-md"
                                placeholder="Field Name"
                            />
                            <select
                                value={field.field_type}
                                onChange={(e) =>
                                    handleFieldChange(index, {
                                        field_type: e.target.value,
                                    })
                                }
                                className="mt-2 p-2 block w-full border rounded-md"
                            >
                                <option value="text">Text</option>
                                <option value="long-text">Long Text</option>
                                <option value="date">Date</option>
                                <option value="select">Select</option>
                            </select>
                            <input
                                type="text"
                                value={field.example}
                                onChange={(e) =>
                                    handleFieldChange(index, {
                                        example: e.target.value,
                                    })
                                }
                                className="mt-2 p-2 block w-full border rounded-md"
                                placeholder="Example"
                            />
                            <div className="mt-2 flex items-center">
                                <input
                                    type="checkbox"
                                    checked={field.required}
                                    onChange={(e) =>
                                        handleFieldChange(index, {
                                            required: e.target.checked,
                                        })
                                    }
                                    className="mr-2"
                                />
                                <label>Required</label>
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={handleAddField}
                        className="mt-2 p-2 bg-green-500 text-white rounded-md"
                    >
                        Add Another Field
                    </button>
                </div>

                <button
                    onClick={handleAddOrUpdateRequestType}
                    className="mt-4 p-2 w-full bg-blue-500 text-white rounded-md"
                >
                    {selectedIndex === null
                        ? "Create Request Type"
                        : "Update Request Type"}
                </button>

                {selectedIndex !== null && (
                    <button
                        onClick={resetForm}
                        className="mt-4 p-2 w-full bg-gray-500 text-white rounded-md"
                    >
                        Cancel Edit
                    </button>
                )}
            </div>

            <div className="mt-10">
                <h2 className="text-xl font-semibold mb-4">
                    Existing Request Types
                </h2>
                <ul className="space-y-4">
                    {requestTypes.map((requestType, index) => (
                        <li
                            key={index}
                            className="p-4 border rounded-md bg-white shadow-md"
                        >
                            <h3 className="text-lg font-bold">
                                {requestType.request_type}
                            </h3>
                            <p className="text-sm text-gray-600">
                                {requestType.purpose}
                            </p>
                            <p className="text-sm text-gray-600">
                                Owner: {requestType.request_type_owner}
                            </p>
                            <p className="text-sm text-gray-600">
                                Created on:{" "}
                                {new Date(
                                    requestType.time_of_creation
                                ).toLocaleString()}
                            </p>
                            {requestType.time_of_update && (
                                <p className="text-sm text-gray-600">
                                    Updated on:{" "}
                                    {new Date(
                                        requestType.time_of_update
                                    ).toLocaleString()}
                                </p>
                            )}
                            <button
                                onClick={() => handleEdit(index)}
                                className="mt-2 p-2 bg-yellow-500 text-white rounded-md"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => deleteRequestType(index)}
                                className="mt-2 p-2 ml-2 bg-red-500 text-white rounded-md"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
