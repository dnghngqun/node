const { db } = require('../firebaseConfig');


exports.addStudent = async (req, res) => {
  try {
    const studentRef = db.collection('students').doc();  
    await studentRef.set(req.body);
    res.status(201).send({ id: studentRef.id, ...req.body });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};


exports.getStudents = async (req, res) => {
  try {
    const studentsSnapshot = await db.collection('students').get();
    const students = studentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.send(students);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};


exports.updateStudent = async (req, res) => {
  try {
    const studentRef = db.collection('students').doc(req.params.id);
    await studentRef.update(req.body);
    res.send({ id: req.params.id, ...req.body });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};


exports.deleteStudent = async (req, res) => {
  try {
    const studentRef = db.collection('students').doc(req.params.id);
    await studentRef.delete();
    res.send({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
