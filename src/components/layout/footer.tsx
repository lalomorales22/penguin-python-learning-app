export default function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground py-8 text-center">
      <div className="container mx-auto px-4">
        <p className="text-md">
          &copy; {new Date().getFullYear()} Penguin Python. Keep waddling and coding, little penguins!
        </p>
      </div>
    </footer>
  );
}
