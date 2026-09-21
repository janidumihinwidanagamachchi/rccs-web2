const base = import.meta.env.BASE_URL

export function CardFooter() {
  return (
    <div className="tm-bottom-container">
      <div className="tm-barcode-box">
        <img src={`${base}card/bar-code.jpg`} alt="Bar code" width={150} height={28} />
      </div>
      <footer>
        || Copyright &copy; {new Date().getFullYear()} RCCSWebComp-NC · School Events,
        Tickets &amp; Passport || &nbsp;Design: <span>Tooplate "The Card"</span> ||
      </footer>
    </div>
  )
}