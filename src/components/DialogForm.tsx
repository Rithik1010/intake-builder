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

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateFields = () => {
        const newErrors: { [key: string]: string } = {};
        if (!typeName.trim()) {
            newErrors.typeName = "Request Type is required.";
        }
        if (!purpose.trim()) {
            newErrors.purpose = "Purpose is required.";
        }
        fields.forEach((field, index) => {
            if (!field.name.trim()) {
                newErrors[`field-name-${index}`] = "Field Name is required.";
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

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

        // Clear the error for this field if it becomes valid
        if (field.name !== undefined) {
            const errorKey = `field-name-${index}`;
            if (field.name.trim()) {
                setErrors((prevErrors) => {
                    const { [errorKey]: removed, ...remainingErrors } =
                        prevErrors;
                    return remainingErrors;
                });
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [errorKey]: "Field Name is required.",
                }));
            }
        }

        if (field.example !== undefined) {
            const errorKey = `example-${index}`;
            if (field.example.trim()) {
                setErrors((prevErrors) => {
                    const { [errorKey]: removed, ...remainingErrors } =
                        prevErrors;
                    return remainingErrors;
                });
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [errorKey]: "Example is required.",
                }));
            }
        }
    };

    const handleRemoveField = (event: React.MouseEvent, index: number) => {
        event.preventDefault();
        const newFields = fields.filter((_, i) => i !== index);
        setFields(newFields);

        // Remove errors related to this field
        setErrors((prevErrors) => {
            const { [`field-name-${index}`]: removedName, ...remainingErrors } =
                prevErrors;
            return remainingErrors;
        });
    };

    const handleSubmit = (event: React.MouseEvent) => {
        event.preventDefault();
        if (validateFields()) {
            onSubmit({
                type_name: typeName,
                purpose,
                information_to_collect: fields,
            });
            onClose();
        }
    };

    return (
        <form className="space-y-4 p-4">
            <Label htmlFor="typeName" className="dark:text-gray-100">
                Request Type
            </Label>
            <Input
                id="typeName"
                value={typeName}
                onChange={(e) => {
                    setTypeName(e.target.value);
                    if (e.target.value.trim()) {
                        setErrors((prevErrors) => {
                            const { typeName, ...remainingErrors } = prevErrors;
                            return remainingErrors;
                        });
                    } else {
                        setErrors((prevErrors) => ({
                            ...prevErrors,
                            typeName: "Request Type is required.",
                        }));
                    }
                }}
                placeholder="E.g., NDA Request - Sales"
                className="dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"
            />
            {errors.typeName && (
                <p className="text-red-500 text-sm">{errors.typeName}</p>
            )}
            <Separator className="my-4" />
            <Label htmlFor="purpose" className="dark:text-gray-100">
                Purpose
            </Label>
            <Input
                id="purpose"
                value={purpose}
                onChange={(e) => {
                    setPurpose(e.target.value);
                    if (e.target.value.trim()) {
                        setErrors((prevErrors) => {
                            const { purpose, ...remainingErrors } = prevErrors;
                            return remainingErrors;
                        });
                    } else {
                        setErrors((prevErrors) => ({
                            ...prevErrors,
                            purpose: "Purpose is required.",
                        }));
                    }
                }}
                placeholder="Define when this form should be filled..."
                className="dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"
            />
            {errors.purpose && (
                <p className="text-red-500 text-sm">{errors.purpose}</p>
            )}
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
                            {errors[`field-name-${index}`] && (
                                <p className="text-red-500 text-sm">
                                    {errors[`field-name-${index}`]}
                                </p>
                            )}
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
