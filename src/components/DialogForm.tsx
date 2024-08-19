import { useState } from "react";
import { InformationField, RequestType } from "@/store/store";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";

interface DialogFormProps {
    onSubmit: (requestType: RequestType) => void;
    onClose: () => void;
    initialData?: RequestType;
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
        event.preventDefault();
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

    const handleRemoveField = (event: React.MouseEvent, index: number) => {
        event.preventDefault();
        const newFields = fields.filter((_, i) => i !== index);
        setFields(newFields);
    };

    const handleSubmit = (event: React.MouseEvent) => {
        event.preventDefault();
        onSubmit({
            type_name: typeName,
            purpose,
            information_to_collect: fields,
        });
        onClose();
    };

    return (
        <form className="space-y-4 mt-4 max-h-[80vh] p-4">
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
            <Separator className="my-4" />
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
            <Separator className="my-4" />
            <div className="space-y-4">
                <h3 className="font-semibold dark:text-gray-100 text-lg">
                    Information to Collect
                </h3>
                {fields.map((field, index) => (
                    <div
                        key={index}
                        className="space-y-3 p-4 rounded-lg bg-gray-200 dark:bg-gray-700"
                    >
                        <div>
                            <Label
                                htmlFor={`field-name-${index}`}
                                className="dark:text-gray-100 mb-1"
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
                                className="dark:text-gray-100 mb-1"
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
                                className="dark:text-gray-100 mb-1"
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
                        <div className="flex items-center justify-between">
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
                            <Button
                                variant="destructive"
                                onClick={(event) =>
                                    handleRemoveField(event, index)
                                }
                                className="ml-4"
                            >
                                Remove
                            </Button>
                        </div>
                    </div>
                ))}
                <Button
                    variant="secondary"
                    onClick={handleAddField}
                    className="dark:bg-gray-700 dark:text-gray-100 w-full"
                >
                    Add Another Field
                </Button>
            </div>
            <div className="mt-4 flex justify-end">
                <Button
                    variant="outline"
                    onClick={handleSubmit}
                    className="dark:border-gray-600 dark:text-gray-100"
                >
                    {initialData
                        ? "Update Request Type"
                        : "Create Request Type"}
                </Button>
            </div>
        </form>
    );
}
