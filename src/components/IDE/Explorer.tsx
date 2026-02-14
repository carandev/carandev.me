import {
  FolderTree,
  ChevronRight,
  ChevronDown,
  FileCode,
  Mail,
  Folder,
  Lock,
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import { useSecrets } from "../../hooks/useSecrets";

interface ExplorerProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onOpenSecretFile?: (fileId: string, content: string) => void;
}

const files = [
  { id: "about", name: "sobre-mi.cs", icon: FileCode, type: "file" },
  { id: "projects", name: "proyectos.cs", icon: FileCode, type: "file" },
  { id: "contact", name: "contacto.cs", icon: Mail, type: "file" },
];

const secretFiles = [
  { id: "videojuegos", name: "videojuegos.md", content: "" },
  { id: "libros", name: "libros.md", content: "" },
  { id: "diseno-3d", name: "diseno-3d.md", content: "" },
  { id: "datos-friki", name: "datos-friki.md", content: "" },
  { id: "frases", name: "frases.md", content: "" },
];

import secretoData from "../../data/secrets/videojuegos.md?raw";
import librosData from "../../data/secrets/libros.md?raw";
import disenoData from "../../data/secrets/diseno-3d.md?raw";
import frikiData from "../../data/secrets/datos-friki.md?raw";
import frasesData from "../../data/secrets/frases.md?raw";

const secretContents: Record<string, string> = {
  videojuegos: secretoData,
  libros: librosData,
  "diseno-3d": disenoData,
  "datos-friki": frikiData,
  frases: frasesData,
};

export function Explorer({
  activeSection,
  onSectionChange,
  onOpenSecretFile,
}: ExplorerProps) {
  const { colors } = useTheme();
  const { unlocked, justUnlocked } = useSecrets();
  const [expanded, setExpanded] = useState(true);
  const [secretsExpanded, setSecretsExpanded] = useState(true);

  return (
    <div
      style={{
        width: "220px",
        background: colors.sidebar,
        display: "flex",
        flexDirection: "column",
        borderRight: `1px solid ${colors.border}`,
      }}
    >
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          padding: "10px 12px",
          fontSize: "11px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          color: colors.foreground,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        Explorador
      </div>

      {expanded && (
        <div style={{ padding: "0 8px" }}>
          <div
            style={{
              padding: "4px 8px",
              fontSize: "13px",
              color: colors.foreground,
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginBottom: "4px",
            }}
          >
            <FolderTree size={16} color={colors.yellow} />
            carandev-portfolio
          </div>

          {files.map((file) => (
            <button
              key={file.id}
              onClick={() => onSectionChange(file.id)}
              style={{
                width: "100%",
                padding: "4px 8px 4px 24px",
                fontSize: "13px",
                background:
                  activeSection === file.id ? colors.selection : "transparent",
                border: "none",
                borderLeft:
                  activeSection === file.id
                    ? `2px solid ${colors.blue}`
                    : "2px solid transparent",
                color:
                  activeSection === file.id ? colors.blue : colors.foreground,
                cursor: "pointer",
                textAlign: "left",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontFamily: "var(--font-mono)",
              }}
            >
              <file.icon size={14} color={colors.foreground} />
              {file.name}
            </button>
          ))}

          {/* Carpeta SECRETOS - siempre visible */}
          <div style={{ marginTop: "8px" }}>
            <button
              onClick={() => {
                if (unlocked) {
                  setSecretsExpanded(!secretsExpanded);
                }
              }}
              style={{
                width: "100%",
                padding: "4px 8px",
                fontSize: "13px",
                background: "transparent",
                border: "none",
                color: unlocked ? colors.foreground : colors.overlay,
                cursor: unlocked ? "pointer" : "not-allowed",
                opacity: unlocked ? 1 : 0.5,
                textAlign: "left",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontFamily: "var(--font-mono)",
              }}
            >
              {unlocked ? (
                secretsExpanded ? (
                  <ChevronDown size={14} />
                ) : (
                  <ChevronRight size={14} />
                )
              ) : (
                <Lock size={14} />
              )}
              <Folder
                size={14}
                color={unlocked ? colors.orange : colors.overlay}
              />
              SECRETOS
            </button>

            {unlocked &&
              secretsExpanded &&
              secretFiles.map((file) => (
                <button
                  key={file.id}
                  onClick={() =>
                    onOpenSecretFile?.(file.id, secretContents[file.id])
                  }
                  style={{
                    width: "100%",
                    padding: "4px 8px 4px 24px",
                    fontSize: "13px",
                    background: "transparent",
                    border: "none",
                    color: colors.foreground,
                    cursor: "pointer",
                    textAlign: "left",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  <Lock size={14} color={colors.pink} />
                  {file.name}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
