const colors = [
  {
    name: "Primary",
    token: "bg-primary",
    text: "text-primary-foreground",
  },
  {
    name: "Secondary",
    token: "bg-secondary",
    text: "text-secondary-foreground",
  },
  {
    name: "Card",
    token: "bg-card",
    text: "text-card-foreground",
  },
  {
    name: "Muted",
    token: "bg-muted",
    text: "text-muted-foreground",
  },
  {
    name: "Accent",
    token: "bg-accent",
    text: "text-accent-foreground",
  },
  {
    name: "Destructive",
    token: "bg-destructive",
    text: "text-primary-foreground",
  },
];

type ColorTokenProps = {
  name: string;
  token: string;
  text: string;
};

function ColorToken({
  name,
  token,
  text,
}: ColorTokenProps) {
  return (
    <div className="space-y-3">
      <div
        className={`flex h-24 items-center justify-center rounded-xl border ${token}`}
      >
        <span className={`font-medium ${text}`}>
          {name}
        </span>
      </div>

      <div>
        <p className="font-medium">{name}</p>

        <p className="text-sm text-muted-foreground">
          {token}
        </p>
      </div>
    </div>
  );
}

export function ColorPalette() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">
          Colors
        </h2>

        <p className="text-muted-foreground">
          Tokens principales del sistema.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {colors.map((color) => (
          <ColorToken
            key={color.name}
            {...color}
          />
        ))}
      </div>
    </section>
  );
}