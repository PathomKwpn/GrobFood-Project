import { StyledEngineProvider } from "@mui/material";

export default function InjectTailwind({ children }: any) {
  return <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>;
}
