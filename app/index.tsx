import { Redirect } from "expo-router";

export default function Index() {
  // Redirect to the auth flow
  return <Redirect href="/login" />;
}
