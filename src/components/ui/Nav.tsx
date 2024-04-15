import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Nav() {
  return (
    <nav className="flex w-full items-center justify-between p-4">
      <h2 className="text-xl font-semibold">Trash</h2>
      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
