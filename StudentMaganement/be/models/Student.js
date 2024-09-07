const { db } = require("../firebaseConfig");

const studentsCollection = db.collection("students");

const Student = {
    create: async (data) => {
        try {
            const docRef = await studentsCollection.add(data);
            return { id: docRef.id, ...data };
        } catch (error) {
            throw new Error(`Error creating student: ${error.message}`);
        }
    },

    getAll: async () => {
        try {
            const studentsSnapshot = await studentsCollection.get();
            return studentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            throw new Error(`Error getting students: ${error.message}`);
        }
    },

    getById: async (id) => {
        try {
            const studentRef = studentsCollection.doc(id);
            const studentSnapshot = await studentRef.get();
            if (!studentSnapshot.exists) {
                return null;
            }
            return { id: studentSnapshot.id, ...studentSnapshot.data() };
        } catch (error) {
            throw new Error(`Error getting student by ID: ${error.message}`);
        }
    },

    update: async (id, data) => {
        try {
            const studentRef = studentsCollection.doc(id);
            await studentRef.update(data);
            return { id, ...data };
        } catch (error) {
            throw new Error(`Error updating student: ${error.message}`);
        }
    },

    delete: async (id) => {
        try {
            const studentRef = studentsCollection.doc(id);
            await studentRef.delete();
            return { message: "Student deleted successfully" };
        } catch (error) {
            throw new Error(`Error deleting student: ${error.message}`);
        }
    }
};

module.exports = Student;
