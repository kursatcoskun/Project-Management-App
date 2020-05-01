package com.kursatcoskun.issuemanagement.repositories;

import com.kursatcoskun.issuemanagement.entities.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    Project getByProjectCode(String projectCode);

    Page<Project> findAllByOrderById(Pageable pageable);

    List<Project> findAll(Sort sort);

    List<Project> findAllByOrderById();
}
