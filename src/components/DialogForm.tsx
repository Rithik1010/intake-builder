import { useState } from "react";
import { InformationField } from "@/store/store";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface DialogFormProps {
    onSubmit: (data: any) => void;
    onClose: () => void;
    initialData?: any;
}

export default function DialogForm({
    onSubmit,
    onClose,
    initialData,
}: DialogFormProps) {
    const [requestType, setRequestType] = useState(
        initialData?.request_type || ""
    );
    const [purpose, setPurpose] = useState(initialData?.purpose || "");
    const [owner, setOwner] = useState(initialData?.request_type_owner || "");
    const [fields, setFields] = useState<InformationField[]>(
        initialData?.information_to_collect || [
            { name: "", field_type: "text", required: true, example: "" },
        ]
    );

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

    const handleSubmit = () => {
        onSubmit({
            request_type: requestType,
            purpose,
            information_to_collect: fields,
            request_type_owner: owner,
        });
        onClose();
    };

    return (
        <form className="space-y-4 mt-4">
            <Label htmlFor="requestType">Request Type</Label>
            <Input
                id="requestType"
                value={requestType}
                onChange={(e) => setRequestType(e.target.value)}
                placeholder="E.g., NDA Request - Sales"
            />

            <Label htmlFor="purpose">Purpose</Label>
            <Input
                id="purpose"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="Define when this form should be filled..."
            />

            <Label htmlFor="owner">Request Type Owner (Email)</Label>
            <Input
                id="owner"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                placeholder="owner@example.com"
            />
            <div className="space-y-2">
                <h3 className="font-semibold">Information to Collect</h3>
                {fields.map((field, index) => (
                    <div key={index} className="space-y-2">
                        <div>
                            <Label htmlFor={`field-name-${index}`}>
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
                            />
                        </div>
                        <div>
                            <Label htmlFor={`field-type-${index}`}>
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
                                className="w-full p-2 border rounded-md"
                            >
                                <option value="text">Text</option>
                                <option value="long-text">Long Text</option>
                                <option value="date">Date</option>
                                <option value="select">Select</option>
                            </select>
                        </div>
                        <div>
                            <Label htmlFor={`example-${index}`}>Example</Label>
                            <Input
                                id={`example-${index}`}
                                value={field.example}
                                onChange={(e) =>
                                    handleFieldChange(index, {
                                        example: e.target.value,
                                    })
                                }
                                placeholder="Example"
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
                                className="mr-2"
                            />
                            <Label htmlFor={`required-${index}`}>
                                Required
                            </Label>
                        </div>
                    </div>
                ))}
                <Button variant="secondary" onClick={handleAddField}>
                    Add Another Field
                </Button>
            </div>
            <div className="mt-4">
                <Button variant="default" onClick={handleSubmit}>
                    {initialData
                        ? "Update Request Type"
                        : "Create Request Type"}
                </Button>
                <Button variant="outline" onClick={onClose} className="mt-4">
                    Close
                </Button>
            </div>
        </form>
    );
}
