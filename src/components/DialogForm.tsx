import { useState } from "react";
import { InformationField, RequestType } from "@/store/store";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface DialogFormProps {
    onSubmit: (requestType: RequestType) => void;
    onClose: () => void;
    initialData?: any;
}

export default function DialogForm({
    onSubmit,
    onClose,
    initialData,
}: DialogFormProps) {
    const [typeName, setTypeName] = useState(initialData?.type_name || "");
    const [purpose, setPurpose] = useState(initialData?.purpose || "");
    const [fields, setFields] = useState<InformationField[]>(
        initialData?.information_to_collect || [
            { name: "", field_type: "text", required: true, example: "" },
        ]
    );

    const handleAddField = (event: React.MouseEvent) => {
        event.preventDefault(); // Prevent default button behavior
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

    const handleSubmit = (event: React.MouseEvent) => {
        event.preventDefault(); // Prevent default form submission behavior
        onSubmit({
            type_name: typeName,
            purpose,
            information_to_collect: fields,
        });
        onClose();
    };

    return (
        <form className="space-y-4 mt-4">
            <Label htmlFor="typeName" className="dark:text-gray-100">
                Request Type
            </Label>
            <Input
                id="typeName"
                value={typeName}
                onChange={(e) => setTypeName(e.target.value)}
                placeholder="E.g., NDA Request - Sales"
                className="dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"
            />

            <Label htmlFor="purpose" className="dark:text-gray-100">
                Purpose
            </Label>
            <Input
                id="purpose"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="Define when this form should be filled..."
                className="dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"
            />

            <div className="space-y-2">
                <h3 className="font-semibold dark:text-gray-100">
                    Information to Collect
                </h3>
                {fields.map((field, index) => (
                    <div key={index} className="space-y-2">
                        <div>
                            <Label
                                htmlFor={`field-name-${index}`}
                                className="dark:text-gray-100"
                            >
                                Field Name
                            </Label>
                            <Input
                                id={`field-name-${index}`}
                                value={field.name}
                                onChange={(e) =>
                                    handleFieldChange(index, {
                                        name: e.target.value,
                                    })
                                }
                                placeholder="Field Name"
                                className="dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"
                            />
                        </div>
                        <div>
                            <Label
                                htmlFor={`field-type-${index}`}
                                className="dark:text-gray-100"
                            >
                                Field Type
                            </Label>
                            <select
                                id={`field-type-${index}`}
                                value={field.field_type}
                                onChange={(e) =>
                                    handleFieldChange(index, {
                                        field_type: e.target.value,
                                    })
                                }
                                className="w-full p-2 border rounded-md bg-white dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"
                            >
                                <option value="text">Text</option>
                                <option value="long-text">Long Text</option>
                                <option value="date">Date</option>
                                <option value="select">Select</option>
                            </select>
                        </div>
                        <div>
                            <Label
                                htmlFor={`example-${index}`}
                                className="dark:text-gray-100"
                            >
                                Example
                            </Label>
                            <Input
                                id={`example-${index}`}
                                value={field.example}
                                onChange={(e) =>
                                    handleFieldChange(index, {
                                        example: e.target.value,
                                    })
                                }
                                placeholder="Example"
                                className="dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"
                            />
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={field.required}
                                onChange={(e) =>
                                    handleFieldChange(index, {
                                        required: e.target.checked,
                                    })
                                }
                                className="mr-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <Label
                                htmlFor={`required-${index}`}
                                className="dark:text-gray-100"
                            >
                                Required
                            </Label>
                        </div>
                    </div>
                ))}
                <Button
                    variant="secondary"
                    onClick={handleAddField}
                    className="dark:bg-gray-700 dark:text-gray-100"
                >
                    Add Another Field
                </Button>
            </div>
            <div className="mt-4">
                <Button
                    variant="default"
                    onClick={handleSubmit}
                    className="dark:bg-gray-700 dark:text-gray-100"
                >
                    {initialData
                        ? "Update Request Type"
                        : "Create Request Type"}
                </Button>
                <Button
                    variant="outline"
                    onClick={onClose}
                    className="mt-4 dark:border-gray-600 dark:text-gray-100"
                >
                    Close
                </Button>
            </div>
        </form>
    );
}
