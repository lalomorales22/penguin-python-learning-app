export default function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground py-8 text-center">
      <div className="container mx-auto px-4">
        <p className="text-md">
          &copy; {new Date().getFullYear()} Python Sprouts. Keep growing and coding, little sprouts!
        </p>
      </div>
    </footer>
  );
}
