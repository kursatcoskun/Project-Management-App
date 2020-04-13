package com.kursatcoskun.issuemanagement.dto;

import com.kursatcoskun.issuemanagement.entities.IssueStatus;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.Date;

@Data
@ApiModel(value = "Issue Input Transfer Object")
public class IssueInputDto {
    private Long id;
    private String description;
    private String details;
    private Date date;
    private IssueStatus issueStatus;
    private Long assigneeId;
    private Long projectId;
}
