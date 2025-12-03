import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Card from "../../components/card";
import Badge from "../../components/badge";
import Modal from "../../components/modal";
import Table from "../../components/table";
import Pagination from "../../components/pagination";
import { useAuthContext } from "../../contexts";
import {
  getPendingSubmissions,
  approveSubmission,
  rejectSubmission,
} from "../../store/submission-store";
import { ADMIN_URL, AUTH_URL } from "../../constant/url";
import type { KycSubmission } from "../../types/submission";
import { SubmissionStatus } from "../../types/submission";
import { formatDate } from "../../utils/date";

const ITEMS_PER_PAGE = 10;

const Submissions = () => {
  const { user, isOfficer } = useAuthContext();
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<KycSubmission[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    action: "approve" | "reject";
    submission: KycSubmission | null;
  }>({
    isOpen: false,
    action: "approve",
    submission: null,
  });

  useEffect(() => {
    if (!isOfficer) {
      navigate(ADMIN_URL.PROFILE);
      return;
    }
    loadSubmissions();
  }, [isOfficer, navigate]);

  const loadSubmissions = () => {
    const pendingSubmissions = getPendingSubmissions();
    setSubmissions(pendingSubmissions);
  };

  const openConfirmModal = (
    action: "approve" | "reject",
    submission: KycSubmission
  ) => {
    setConfirmModal({ isOpen: true, action, submission });
  };

  const closeConfirmModal = () => {
    setConfirmModal({ isOpen: false, action: "approve", submission: null });
  };

  const handleConfirm = () => {
    if (!confirmModal.submission || !user?.id) return;

    if (confirmModal.action === "approve") {
      approveSubmission(confirmModal.submission.id, user.id);
    } else {
      rejectSubmission(confirmModal.submission.id, user.id);
    }

    closeConfirmModal();
    loadSubmissions();
  };

  const viewProfile = (userId: number) => {
    navigate(`/admin/clients/${userId}`);
  };

  const getStatusBadge = (status: SubmissionStatus) => {
    switch (status) {
      case SubmissionStatus.PENDING:
        return <Badge variant="warning">Pending</Badge>;
      case SubmissionStatus.APPROVED:
        return <Badge variant="success">Active</Badge>;
      case SubmissionStatus.REJECTED:
        return <Badge variant="error">Inactive</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const totalPages = Math.ceil(submissions.length / ITEMS_PER_PAGE);
  const paginatedSubmissions = submissions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const columns = [
    {
      key: "name",
      header: "NAME",
      render: (item: KycSubmission) => (
        <button
          onClick={() => viewProfile(item.userId)}
          className="text-gray-900 hover:text-blue-600 hover:underline"
        >
          {item.userName}
        </button>
      ),
    },
    {
      key: "status",
      header: "STATUS",
      render: (item: KycSubmission) => getStatusBadge(item.status),
    },
    {
      key: "date",
      header: "DATE",
      render: (item: KycSubmission) => formatDate(item.submittedAt),
    },
    {
      key: "actions",
      header: "ACTIONS",
      render: (item: KycSubmission) => (
        <div className="flex gap-2">
          <button
            onClick={() => openConfirmModal("approve", item)}
            className="px-4 py-1.5 text-sm font-medium text-green-700 border border-green-300 rounded-md hover:bg-green-50"
          >
            Approve
          </button>
          <button
            onClick={() => openConfirmModal("reject", item)}
            className="px-4 py-1.5 text-sm font-medium text-red-700 border border-red-300 rounded-md hover:bg-red-50"
          >
            Reject
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">KYC Submission</h1>

      <Card>
        <Table
          columns={columns}
          data={paginatedSubmissions}
          keyExtractor={(item) => item.id}
          emptyMessage="No pending submissions"
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </Card>

      <Modal
        isOpen={confirmModal.isOpen}
        onClose={closeConfirmModal}
        title="Confirm Submission Action"
        footer={
          <>
            <button
              onClick={closeConfirmModal}
              className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              No, cancel
            </button>
            <button
              onClick={handleConfirm}
              className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
                confirmModal.action === "approve"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              Yes, I'm sure
            </button>
          </>
        }
      >
        <p className="text-gray-600">
          Are you sure you want to {confirmModal.action} this submission?
        </p>
      </Modal>
    </div>
  );
};

export default Submissions;

