import { useState, useEffect } from "react";
import styled from "styled-components";
import { kidsAPI, usersAPI } from "../services/api";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";
import { colors } from "../theme/colors";

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled(Card)`
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid ${colors.borderLight};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const KidsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const KidCard = styled(Card)`
  cursor: pointer;
`;

const KidName = styled.h3`
  color: ${colors.primary};
  margin-bottom: 0.5rem;
`;

const KidInfo = styled.p`
  color: ${colors.textSecondaryLight};
  font-size: 0.9rem;
  margin: 0.25rem 0;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${colors.textSecondaryLight};
`;

const FilterBar = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 2px solid ${colors.borderLight};
  border-radius: 12px;
  font-size: 1rem;
  background-color: ${colors.white};
  color: ${colors.textPrimaryLight};
  cursor: pointer;

  &:focus {
    border-color: ${colors.primary};
    outline: none;
  }
`;

export default function Kids() {
  const [kids, setKids] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingKid, setEditingKid] = useState(null);
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    dateOfBirth: "",
    gender: "",
    medicalInfo: {
      allergies: "",
      medications: "",
      specialNeeds: "",
      bloodType: "",
    },
    emergencyContact: {
      name: "",
      relationship: "",
      phone: "",
    },
  });

  useEffect(() => {
    fetchUsers();
    fetchKids();
  }, []);

  useEffect(() => {
    fetchKids();
  }, [selectedUserId]);

  const fetchUsers = async () => {
    try {
      const response = await usersAPI.getAll();
      setUsers(response.data.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchKids = async () => {
    try {
      setLoading(true);
      const response = selectedUserId
        ? await kidsAPI.getByUserId(selectedUserId)
        : await kidsAPI.getAll();
      setKids(response.data.data || []);
    } catch (error) {
      console.error("Error fetching kids:", error);
      alert("Error fetching kids");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingKid(null);
    setFormData({
      userId: selectedUserId || "",
      name: "",
      dateOfBirth: "",
      gender: "",
      medicalInfo: {
        allergies: "",
        medications: "",
        specialNeeds: "",
        bloodType: "",
      },
      emergencyContact: {
        name: "",
        relationship: "",
        phone: "",
      },
    });
    setShowModal(true);
  };

  const handleEdit = (kid) => {
    setEditingKid(kid);
    setFormData({
      userId: kid.userId?._id || kid.userId || "",
      name: kid.name || "",
      dateOfBirth: kid.dateOfBirth ? kid.dateOfBirth.split("T")[0] : "",
      gender: kid.gender || "",
      medicalInfo: {
        allergies: Array.isArray(kid.medicalInfo?.allergies)
          ? kid.medicalInfo.allergies.join(", ")
          : kid.medicalInfo?.allergies || "",
        medications: Array.isArray(kid.medicalInfo?.medications)
          ? kid.medicalInfo.medications.join(", ")
          : kid.medicalInfo?.medications || "",
        specialNeeds: kid.medicalInfo?.specialNeeds || "",
        bloodType: kid.medicalInfo?.bloodType || "",
      },
      emergencyContact: {
        name: kid.emergencyContact?.name || "",
        relationship: kid.emergencyContact?.relationship || "",
        phone: kid.emergencyContact?.phone || "",
      },
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = {
        ...formData,
        medicalInfo: {
          ...formData.medicalInfo,
          allergies: formData.medicalInfo.allergies
            ? formData.medicalInfo.allergies.split(",").map((a) => a.trim())
            : [],
          medications: formData.medicalInfo.medications
            ? formData.medicalInfo.medications.split(",").map((m) => m.trim())
            : [],
        },
      };

      if (editingKid) {
        await kidsAPI.update(editingKid._id, submitData);
      } else {
        await kidsAPI.create(submitData);
      }
      setShowModal(false);
      fetchKids();
    } catch (error) {
      console.error("Error saving kid:", error);
      alert(error.response?.data?.error || "Error saving kid");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this kid?")) return;

    try {
      await kidsAPI.delete(id);
      fetchKids();
    } catch (error) {
      console.error("Error deleting kid:", error);
      alert("Error deleting kid");
    }
  };

  return (
    <div>
      <PageHeader>
        <h1 style={{ color: colors.primary }}>Kids Management</h1>
        <Button onClick={handleCreate}>+ Add Kid</Button>
      </PageHeader>

      <FilterBar>
        <label style={{ fontWeight: 500 }}>Filter by User:</label>
        <Select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
        >
          <option value="">All Users</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name} ({user.email})
            </option>
          ))}
        </Select>
      </FilterBar>

      {loading ? (
        <div style={{ textAlign: "center", padding: "3rem" }}>Loading...</div>
      ) : kids.length === 0 ? (
        <EmptyState>
          <p>No kids found. Create your first kid!</p>
        </EmptyState>
      ) : (
        <KidsGrid>
          {kids.map((kid) => (
            <KidCard key={kid._id}>
              <KidName>{kid.name}</KidName>
              {kid.userId && (
                <KidInfo>👤 Parent: {kid.userId.name || kid.userId}</KidInfo>
              )}
              {kid.dateOfBirth && (
                <KidInfo>
                  🎂 {new Date(kid.dateOfBirth).toLocaleDateString()}
                </KidInfo>
              )}
              {kid.gender && <KidInfo>⚧️ {kid.gender}</KidInfo>}
              {kid.medicalInfo?.bloodType && (
                <KidInfo>🩸 Blood Type: {kid.medicalInfo.bloodType}</KidInfo>
              )}
              <ButtonGroup>
                <Button size="small" onClick={() => handleEdit(kid)}>
                  Edit
                </Button>
                <Button
                  size="small"
                  variant="danger"
                  onClick={() => handleDelete(kid._id)}
                >
                  Delete
                </Button>
              </ButtonGroup>
            </KidCard>
          ))}
        </KidsGrid>
      )}

      {showModal && (
        <Modal onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h2>{editingKid ? "Edit Kid" : "Create Kid"}</h2>
              <Button
                size="small"
                variant="secondary"
                onClick={() => setShowModal(false)}
              >
                ✕
              </Button>
            </ModalHeader>
            <form onSubmit={handleSubmit}>
              <Input
                label="Parent User"
                type="select"
                value={formData.userId}
                onChange={(e) =>
                  setFormData({ ...formData, userId: e.target.value })
                }
                required
              >
                <option value="">Select a user</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </Input>
              <Input
                label="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
              <Input
                label="Date of Birth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) =>
                  setFormData({ ...formData, dateOfBirth: e.target.value })
                }
                required
              />
              <Input
                label="Gender"
                type="select"
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Input>
              <h3
                style={{
                  marginTop: "1rem",
                  marginBottom: "0.5rem",
                  color: colors.primary,
                }}
              >
                Medical Information
              </h3>
              <Input
                label="Allergies (comma-separated)"
                value={formData.medicalInfo.allergies}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    medicalInfo: {
                      ...formData.medicalInfo,
                      allergies: e.target.value,
                    },
                  })
                }
              />
              <Input
                label="Medications (comma-separated)"
                value={formData.medicalInfo.medications}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    medicalInfo: {
                      ...formData.medicalInfo,
                      medications: e.target.value,
                    },
                  })
                }
              />
              <Input
                label="Special Needs"
                value={formData.medicalInfo.specialNeeds}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    medicalInfo: {
                      ...formData.medicalInfo,
                      specialNeeds: e.target.value,
                    },
                  })
                }
              />
              <Input
                label="Blood Type"
                value={formData.medicalInfo.bloodType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    medicalInfo: {
                      ...formData.medicalInfo,
                      bloodType: e.target.value,
                    },
                  })
                }
              />
              <h3
                style={{
                  marginTop: "1rem",
                  marginBottom: "0.5rem",
                  color: colors.primary,
                }}
              >
                Emergency Contact
              </h3>
              <Input
                label="Contact Name"
                value={formData.emergencyContact.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    emergencyContact: {
                      ...formData.emergencyContact,
                      name: e.target.value,
                    },
                  })
                }
              />
              <Input
                label="Relationship"
                value={formData.emergencyContact.relationship}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    emergencyContact: {
                      ...formData.emergencyContact,
                      relationship: e.target.value,
                    },
                  })
                }
              />
              <Input
                label="Phone"
                value={formData.emergencyContact.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    emergencyContact: {
                      ...formData.emergencyContact,
                      phone: e.target.value,
                    },
                  })
                }
              />
              <ButtonGroup>
                <Button type="submit">
                  {editingKid ? "Update" : "Create"}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>
              </ButtonGroup>
            </form>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}
