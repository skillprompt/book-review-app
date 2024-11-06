import { useMutation, useQuery } from "@tanstack/react-query";
import {
  loginUser,
  me,
  registerUser,
  TLoginUserInput,
  TLoginUserOutput,
  TMeOutput,
  TRegisterUserInput,
  TRegisterUserOutput,
} from "./fetch";

// for register api
export function useRegisterUserMutation() {
  return useMutation<TRegisterUserOutput, Error, TRegisterUserInput>({
    mutationFn: registerUser,
  });
}

// for login api
export function useLoginUserMutation() {
  return useMutation<TLoginUserOutput, Error, TLoginUserInput>({
    mutationFn: loginUser,
  });
}

// for me api
export function useMeQuery() {
  return useQuery<TMeOutput, Error>({
    queryKey: ["me"],
    queryFn: me,
  });
}
