// Tiny, safe Markdown renderer for assistant replies. It builds React nodes
// (no innerHTML), supports paragraphs, "-" / "1." lists, **bold**, `code`,
// https links, and [n] citations that map to retrieved sources.
const INLINE = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\(https?:\/\/[^)\s]+\)|\[\d{1,2}\])/g;

function inline(text, sources, keyBase) {
  return text.split(INLINE).map((part, i) => {
    const key = `${keyBase}-${i}`;
    if (!part) return null;
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={key}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("`") && part.endsWith("`")) return <code key={key}>{part.slice(1, -1)}</code>;
    const link = part.match(/^\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)$/);
    if (link)
      return (
        <a key={key} href={link[2]} target="_blank" rel="noopener noreferrer">
          {link[1]}
        </a>
      );
    const cite = part.match(/^\[(\d{1,2})\]$/);
    if (cite) {
      const src = sources?.find((s) => s.n === Number(cite[1]));
      if (!src) return null; // never show a citation we can't back
      return (
        <a
          key={key}
          className="cite"
          href={src.url || undefined}
          target="_blank"
          rel="noopener noreferrer"
          title={src.title}
          aria-label={`Source ${src.n}: ${src.title}`}
        >
          {src.n}
        </a>
      );
    }
    return part;
  });
}

export default function Markdown({ text, sources }) {
  const blocks = [];
  let list = null;
  const flush = () => {
    if (list) blocks.push(list), (list = null);
  };
  text.split("\n").forEach((raw, li) => {
    const line = raw.trimEnd();
    const bullet = line.match(/^\s*[-*•]\s+(.*)$/);
    const ordered = line.match(/^\s*\d+[.)]\s+(.*)$/);
    if (bullet || ordered) {
      const kind = bullet ? "ul" : "ol";
      if (!list || list.kind !== kind) {
        flush();
        list = { kind, items: [] };
      }
      list.items.push((bullet || ordered)[1]);
    } else if (!line.trim()) {
      flush();
    } else {
      flush();
      blocks.push({ kind: "p", text: line, li });
    }
  });
  flush();

  return blocks.map((b, i) => {
    if (b.kind === "p") return <p key={i}>{inline(b.text, sources, `p${i}`)}</p>;
    const Tag = b.kind;
    return (
      <Tag key={i}>
        {b.items.map((it, j) => (
          <li key={j}>{inline(it, sources, `l${i}-${j}`)}</li>
        ))}
      </Tag>
    );
  });
}
