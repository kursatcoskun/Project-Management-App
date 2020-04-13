package com.kursatcoskun.issuemanagement.repositories;

import com.kursatcoskun.issuemanagement.entities.Issue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IssueRepository extends JpaRepository<Issue,Long> {

}
