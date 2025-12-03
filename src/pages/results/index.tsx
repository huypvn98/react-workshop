import { useState, useEffect } from "react";
import Card from "../../components/card";
import Badge from "../../components/badge";
import Table from "../../components/table";
import Pagination from "../../components/pagination";
import { useAuthContext } from "../../contexts";
import {
  getReviewedSubmissions,
  getUserSubmissions,
} from "../../store/submission-store";
import type { KycSubmission } from "../../types/submission";
import { SubmissionStatus } from "../../types/submission";
import { formatDate } from "../../utils/date";

const ITEMS_PER_PAGE = 10;

const Results = () => {
  const { user, isOfficer } = useAuthContext();
  const [submissions, setSubmissions] = useState<KycSubmission[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadSubmissions();
  }, [user, isOfficer]);

  const loadSubmissions = () => {
    if (isOfficer) {
      const reviewedSubmissions = getReviewedSubmissions();
      setSubmissions(reviewedSubmissions);
    } else if (user?.id) {
      const userSubmissions = getUserSubmissions(user.id);
      setSubmissions(userSubmissions);
    }
  };

  const getStatusBadge = (status: SubmissionStatus) => {
    switch (status) {
      case SubmissionStatus.PENDING:
        return <Badge variant="warning">Pending</Badge>;
      case SubmissionStatus.APPROVED:
        return <Badge variant="success">Approved</Badge>;
      case SubmissionStatus.REJECTED:
        return <Badge variant="error">Rejected</Badge>;
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
        <span className="text-gray-900">{item.userName}</span>
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
  ];

  if (isOfficer) {
    columns.push({
      key: "reviewedAt",
      header: "REVIEWED AT",
      render: (item: KycSubmission) =>
        item.reviewedAt ? formatDate(item.reviewedAt) : "-",
    });
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {isOfficer ? "KYC Results" : "My Submissions"}
      </h1>

      <Card>
        <Table
          columns={columns}
          data={paginatedSubmissions}
          keyExtractor={(item) => item.id}
          emptyMessage="No submissions found"
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </Card>
    </div>
  );
};

export default Results;

