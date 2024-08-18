import { create } from "zustand";
import axios from "axios";

export interface InformationField {
    name: string;
    field_type: string;
    required: boolean;
    example?: string;
}

interface RequestType {
    request_type: string;
    purpose: string;
    information_to_collect: InformationField[];
    request_type_owner: string;
    time_of_creation: string;
    time_of_update?: string; // Optional field for update time
}

interface RequestTypeState {
    requestTypes: RequestType[];
    fetchRequestTypes: () => Promise<void>;
    addRequestType: (requestType: RequestType) => Promise<void>;
    updateRequestType: (
        index: number,
        requestType: RequestType
    ) => Promise<void>;
    deleteRequestType: (index: number) => Promise<void>;
}

export const useRequestTypeStore = create<RequestTypeState>((set) => ({
    requestTypes: [],

    fetchRequestTypes: async () => {
        try {
            const response = await axios.get<RequestType[]>(
                "http://localhost:8000/request-types/"
            );
            set({ requestTypes: response.data });
        } catch (error) {
            console.error("Error fetching request types:", error);
        }
    },

    addRequestType: async (requestType) => {
        try {
            const response = await axios.post(
                "http://localhost:8000/request-types/",
                requestType
            );
            const newRequestType = response.data;
            set((state) => ({
                requestTypes: [...state.requestTypes, newRequestType],
            }));
        } catch (error) {
            console.error("Error adding request type:", error);
        }
    },

    updateRequestType: async (index, requestType) => {
        try {
            await axios.put(
                `http://localhost:8000/request-types/${index}`,
                requestType
            );
            set((state) => {
                const updatedRequestTypes = [...state.requestTypes];
                updatedRequestTypes[index] = requestType;
                return { requestTypes: updatedRequestTypes };
            });
        } catch (error) {
            console.error("Error updating request type:", error);
        }
    },

    deleteRequestType: async (index) => {
        try {
            await axios.delete(`http://localhost:8000/request-types/${index}`);
            set((state) => ({
                requestTypes: state.requestTypes.filter((_, i) => i !== index),
            }));
        } catch (error) {
            console.error("Error deleting request type:", error);
        }
    },
}));
