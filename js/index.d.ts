declare module '@wulkanowy/uonet-request-signer' {
  export function signContent(password: string, certificate: string, content: string): string;
}
