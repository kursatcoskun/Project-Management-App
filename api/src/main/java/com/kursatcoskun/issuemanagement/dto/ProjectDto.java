package com.kursatcoskun.issuemanagement.dto;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
@ApiModel(value = "Project Data Transfer Object")
public class ProjectDto {
    @NotNull
    @ApiModelProperty(value = "Project ID")
    private Long id;

    @NotNull
    @ApiModelProperty(required = true,value = "Name Of Project")
    private String projectName;

    @NotNull
    @ApiModelProperty(required = true,value = "Code Of Project")
    private String projectCode;
}
