package com.kursatcoskun.issuemanagement.dto;

import com.kursatcoskun.issuemanagement.entities.Issue;
import com.kursatcoskun.issuemanagement.entities.IssueStatus;
import com.kursatcoskun.issuemanagement.entities.User;
import lombok.Data;

import java.util.Date;

@Data
public class IssueHistoryDto {
    private Long id;
    private Long issueId;
    private String description;
    private Date date;
    private IssueStatus issueStatus;
    private String details;
    private Long assigneeId;
}
