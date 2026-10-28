import Alert from "@mui/material/Alert"
import Snackbar from "@mui/material/Snackbar"

// Cartel de aviso reutilizable (alumnos y docentes).
// severity: "success" | "warning" | "error" | "info"
export default function Aviso({ abierto, mensaje, severity = "success", onCerrar }) {
    function cerrar(_evento, motivo) {
        if (motivo === "clickaway") {
            return
        }
        onCerrar()
    }

    return (
        <Snackbar
            open={abierto}
            autoHideDuration={4000}
            onClose={cerrar}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
            <Alert
                severity={severity}
                variant="filled"
                onClose={onCerrar}
                role="status"
                sx={{ width: "100%" }}
            >
                {mensaje}
            </Alert>
        </Snackbar>
    )
}
