
export const ModalEditMoto = () => {
  return (
    <Modal open={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="div" gutterBottom>
          Editar Información
        </Typography>
        <TextField label="Nuevo Valor" fullWidth />
        <Button
          variant="contained"
          onClick={() => {
            handleUpdateField(selectedMoto.id, "color", newColor);
            setEditModalOpen(false);
          }}
        >
          Guardar
        </Button>
      </Box>
    </Modal>
  );
};
