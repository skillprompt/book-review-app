import { useMutation } from "@tanstack/react-query";
import { registerUser, TRegisterUserInput, TRegisterUserOutput } from "./fetch";

export function useRegisterUserMutation() {
  return useMutation<TRegisterUserOutput, Error, TRegisterUserInput>({
    mutationFn: registerUser,
  });
}
