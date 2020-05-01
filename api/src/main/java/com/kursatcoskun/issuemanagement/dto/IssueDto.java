package com.kursatcoskun.issuemanagement.dto;

import com.kursatcoskun.issuemanagement.entities.IssueStatus;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.Date;

@Data
@ApiModel(value = "Issue Data Transfer Object")
public class IssueDto {
    @ApiModelProperty(required = false, value = "ID")
    private Long id;
    @ApiModelProperty(required = true, value = "Description")
    private String description;
    @ApiModelProperty(required = true, value = "Issue Details")
    private String details;
    @ApiModelProperty(required = true, value = "Date")
    private Date date;
    @ApiModelProperty(required = true, value = "Issue Status")
    private IssueStatus issueStatus;
    @ApiModelProperty(required = true, value = "Assignee")
    private UserDto assignee;
    @ApiModelProperty(required = true, value = "Project")
    private ProjectDto project;
    private Boolean status;
}
