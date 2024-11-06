import { useMutation } from "@tanstack/react-query";
import {
  loginUser,
  registerUser,
  TLoginUserInput,
  TLoginUserOutput,
  TRegisterUserInput,
  TRegisterUserOutput,
} from "./fetch";

export function useRegisterUserMutation() {
  return useMutation<TRegisterUserOutput, Error, TRegisterUserInput>({
    mutationFn: registerUser,
  });
}

export function useLoginUserMutation() {
  return useMutation<TLoginUserOutput, Error, TLoginUserInput>({
    mutationFn: loginUser,
  });
}
