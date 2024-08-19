import { create } from "zustand";
import axios from "axios";

export interface InformationField {
    name: string;
    field_type: string;
    required: boolean;
    example?: string;
}

export interface RequestType {
    type_name: string;
    purpose: string;
    information_to_collect: InformationField[];
    time_of_creation?: string;
    time_of_update?: string;
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

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
console.log("Backend URL:", backendUrl);

export const useRequestTypeStore = create<RequestTypeState>((set) => ({
    requestTypes: [],

    fetchRequestTypes: async () => {
        try {
            const userEmail = localStorage.getItem("userEmail");
            if (!userEmail)
                throw new Error("User email not found in local storage");

            const response = await axios.get<RequestType[]>(
                `${backendUrl}/request-types/`,
                {
                    headers: { "x-user-email": userEmail },
                }
            );
            set({ requestTypes: response.data });
        } catch (error) {
            console.error("Error fetching request types:", error);
        }
    },

    addRequestType: async (requestType) => {
        try {
            const userEmail = localStorage.getItem("userEmail");
            if (!userEmail)
                throw new Error("User email not found in local storage");

            const response = await axios.post(
                `${backendUrl}/request-types/`,
                requestType,
                {
                    headers: { "x-user-email": userEmail },
                }
            );
            set((state) => ({
                requestTypes: [...state.requestTypes, response.data],
            }));
        } catch (error) {
            console.error("Error adding request type:", error);
        }
    },

    updateRequestType: async (index, requestType) => {
        try {
            const userEmail = localStorage.getItem("userEmail");
            if (!userEmail)
                throw new Error("User email not found in local storage");

            await axios.put(
                `${backendUrl}/request-types/${index}`,
                requestType,
                {
                    headers: { "x-user-email": userEmail },
                }
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
            const userEmail = localStorage.getItem("userEmail");
            if (!userEmail)
                throw new Error("User email not found in local storage");

            await axios.delete(`${backendUrl}/request-types/${index}`, {
                headers: { "x-user-email": userEmail },
            });
            set((state) => ({
                requestTypes: state.requestTypes.filter((_, i) => i !== index),
            }));
        } catch (error) {
            console.error("Error deleting request type:", error);
        }
    },
}));
