//? Import the `useMutation` hook from React Query to handle mutation operations (e.g., login requests)
import { useMutation } from "@tanstack/react-query";
//? Import utility types to infer request and response types from Hono endpoints
import { InferRequestType, InferResponseType } from "hono";

//? Import the client instance for making API calls to the authentication service
import { client } from "@/lib/rpc";

//? Define the expected request and response type from the login endpoint
type RequestType = InferRequestType<(typeof client.api.auth.signup)["$post"]>;
type ResponseType = InferResponseType<(typeof client.api.auth.signup)["$post"]>;

//? Custom hook `useSignup` to handle signup functionality using React Query's mutation
export const useSignup = () => {
  const mutation = useMutation<
    ResponseType,   //* The expected response type for a successful mutation
    Error,          //* The error type if the mutation fails
    RequestType     //* The request type to be passed into the mutation function
  >({
    //* 1. `mutationFn` is the function that will be executed to make the login request
    //* 2. Call the signup endpoint with the JSON request payload
    //* 3. Parse and return the response JSON, casting it to the expected ResponseType

    mutationFn: async ({ json }) => {
      const response = await client.api.auth.signup["$post"]({ json });
      return (await response.json()) as ResponseType;
    },
  });

  //* Return the mutation object which contains methods and state (e.g., `mutate` function, `isLoading`, etc.)
  return mutation;
};
