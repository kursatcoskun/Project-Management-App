package com.kursatcoskun.issuemanagement.repositories;

import com.kursatcoskun.issuemanagement.entities.Issue;
import com.kursatcoskun.issuemanagement.entities.IssueHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IssueHistoryRepository extends JpaRepository<IssueHistory,Long> {

    List<IssueHistory> getIssueHistoriesByIssueOrderByDate(Issue issue);
}
