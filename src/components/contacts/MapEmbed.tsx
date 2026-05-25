export function MapEmbed() {
  return (
    <div className="glass-card rounded-2xl overflow-hidden h-48 mt-6">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d40350.58478978578!2d30.47482965!3d50.4501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cf37b03b6547%3A0x183c1b6c23e53a69!2z0JrQuNGX0LIsINC60LjRl9CyINC6aXnQuywg0KPQutGA0LDRl9C90LA!5e0!3m2!1suk!2sua!4v1700000000000!5m2!1suk!2sua"
        width="100%"
        height="100%"
        style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
