import { useState, useEffect } from "react";
import styled from "styled-components";
import { usersAPI } from "../services/api";
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

const UsersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const UserCard = styled(Card)`
  cursor: pointer;
`;

const UserName = styled.h3`
  color: ${colors.primary};
  margin-bottom: 0.5rem;
`;

const UserInfo = styled.p`
  color: ${colors.textSecondaryLight};
  font-size: 0.9rem;
  margin: 0.25rem 0;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${colors.textSecondaryLight};
`;

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await usersAPI.getAll();
      setUsers(response.data.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingUser(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
    });
    setShowModal(true);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split("T")[0] : "",
      address: {
        street: user.address?.street || "",
        city: user.address?.city || "",
        state: user.address?.state || "",
        zipCode: user.address?.zipCode || "",
        country: user.address?.country || "",
      },
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await usersAPI.update(editingUser._id, formData);
      } else {
        await usersAPI.create(formData);
      }
      setShowModal(false);
      fetchUsers();
    } catch (error) {
      console.error("Error saving user:", error);
      alert(error.response?.data?.error || "Error saving user");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await usersAPI.delete(id);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error deleting user");
    }
  };

  return (
    <div>
      <PageHeader>
        <h1 style={{ color: colors.primary }}>Users Management</h1>
        <Button onClick={handleCreate}>+ Add User</Button>
      </PageHeader>

      {loading ? (
        <div style={{ textAlign: "center", padding: "3rem" }}>Loading...</div>
      ) : users.length === 0 ? (
        <EmptyState>
          <p>No users found. Create your first user!</p>
        </EmptyState>
      ) : (
        <UsersGrid>
          {users.map((user) => (
            <UserCard key={user._id}>
              <UserName>{user.name}</UserName>
              <UserInfo>📧 {user.email}</UserInfo>
              {user.phone && <UserInfo>📱 {user.phone}</UserInfo>}
              {user.dateOfBirth && (
                <UserInfo>
                  🎂 {new Date(user.dateOfBirth).toLocaleDateString()}
                </UserInfo>
              )}
              <ButtonGroup>
                <Button size="small" onClick={() => handleEdit(user)}>
                  Edit
                </Button>
                <Button
                  size="small"
                  variant="danger"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </Button>
              </ButtonGroup>
            </UserCard>
          ))}
        </UsersGrid>
      )}

      {showModal && (
        <Modal onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h2>{editingUser ? "Edit User" : "Create User"}</h2>
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
                label="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
              <Input
                label="Phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
              <Input
                label="Date of Birth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) =>
                  setFormData({ ...formData, dateOfBirth: e.target.value })
                }
              />
              <h3
                style={{
                  marginTop: "1rem",
                  marginBottom: "0.5rem",
                  color: colors.primary,
                }}
              >
                Address
              </h3>
              <Input
                label="Street"
                value={formData.address.street}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: { ...formData.address, street: e.target.value },
                  })
                }
              />
              <Input
                label="City"
                value={formData.address.city}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: { ...formData.address, city: e.target.value },
                  })
                }
              />
              <Input
                label="State"
                value={formData.address.state}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: { ...formData.address, state: e.target.value },
                  })
                }
              />
              <Input
                label="Zip Code"
                value={formData.address.zipCode}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: { ...formData.address, zipCode: e.target.value },
                  })
                }
              />
              <Input
                label="Country"
                value={formData.address.country}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: { ...formData.address, country: e.target.value },
                  })
                }
              />
              <ButtonGroup>
                <Button type="submit">
                  {editingUser ? "Update" : "Create"}
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
