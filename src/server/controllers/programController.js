const programController = ({ programModel }) => {
  const Program = programModel;
  const getPrograms = async (req, res) => {
    try {
      const programs = await Program.find();
      res.json(programs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  return {
    getPrograms,
  };
}
